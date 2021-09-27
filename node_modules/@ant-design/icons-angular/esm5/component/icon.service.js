import { __assign, __decorate, __param, __read } from "tslib";
import { DOCUMENT } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, Renderer2, RendererFactory2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of as rxof, Observable, Subject } from 'rxjs';
import { catchError, filter, finalize, map, share, take, tap } from 'rxjs/operators';
import { cloneSVG, getIconDefinitionFromAbbr, getNameAndNamespace, getSecondaryColor, hasNamespace, isIconDefinition, replaceFillColor, warn, withSuffix, withSuffixAndColor } from '../utils';
import { DynamicLoadingTimeoutError, HttpModuleNotImport, IconNotFoundError, NameSpaceIsNotSpecifyError, SVGTagNotFoundError, UrlNotSafeError } from './icon.error';
var JSONP_HANDLER_NAME = '__ant_icon_load';
var IconService = /** @class */ (function () {
    function IconService(_rendererFactory, _handler, 
    // tslint:disable-next-line:no-any
    _document, sanitizer) {
        this._rendererFactory = _rendererFactory;
        this._handler = _handler;
        this._document = _document;
        this.sanitizer = sanitizer;
        this.defaultTheme = 'outline';
        /**
         * All icon definitions would be registered here.
         */
        this._svgDefinitions = new Map();
        /**
         * Cache all rendered icons. Icons are identified by name, theme,
         * and for twotone icons, primary color and secondary color.
         */
        this._svgRenderedDefinitions = new Map();
        this._inProgressFetches = new Map();
        /**
         * Url prefix for fetching inline SVG by dynamic importing.
         */
        this._assetsUrlRoot = '';
        this._twoToneColorPalette = {
            primaryColor: '#333333',
            secondaryColor: '#E6E6E6'
        };
        /** A flag indicates whether jsonp loading is enabled. */
        this._enableJsonpLoading = false;
        this._jsonpIconLoad$ = new Subject();
        this._renderer = this._rendererFactory.createRenderer(null, null);
        if (this._handler) {
            this._http = new HttpClient(this._handler);
        }
    }
    Object.defineProperty(IconService.prototype, "twoToneColor", {
        get: function () {
            // Make a copy to avoid unexpected changes.
            return __assign({}, this._twoToneColorPalette);
        },
        set: function (_a) {
            var primaryColor = _a.primaryColor, secondaryColor = _a.secondaryColor;
            this._twoToneColorPalette.primaryColor = primaryColor;
            this._twoToneColorPalette.secondaryColor =
                secondaryColor || getSecondaryColor(primaryColor);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call this method to switch to jsonp like loading.
     */
    IconService.prototype.useJsonpLoading = function () {
        var _this = this;
        if (!this._enableJsonpLoading) {
            this._enableJsonpLoading = true;
            window[JSONP_HANDLER_NAME] = function (icon) {
                _this._jsonpIconLoad$.next(icon);
            };
        }
        else {
            warn('You are already using jsonp loading.');
        }
    };
    /**
     * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
     * @param prefix
     */
    IconService.prototype.changeAssetsSource = function (prefix) {
        this._assetsUrlRoot = prefix.endsWith('/') ? prefix : prefix + '/';
    };
    /**
     * Add icons provided by ant design.
     * @param icons
     */
    IconService.prototype.addIcon = function () {
        var _this = this;
        var icons = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            icons[_i] = arguments[_i];
        }
        icons.forEach(function (icon) {
            _this._svgDefinitions.set(withSuffix(icon.name, icon.theme), icon);
        });
    };
    /**
     * Register an icon. Namespace is required.
     * @param type
     * @param literal
     */
    IconService.prototype.addIconLiteral = function (type, literal) {
        var _a = __read(getNameAndNamespace(type), 2), _ = _a[0], namespace = _a[1];
        if (!namespace) {
            throw NameSpaceIsNotSpecifyError();
        }
        this.addIcon({ name: type, icon: literal });
    };
    /**
     * Remove all cache.
     */
    IconService.prototype.clear = function () {
        this._svgDefinitions.clear();
        this._svgRenderedDefinitions.clear();
    };
    /**
     * Get a rendered `SVGElement`.
     * @param icon
     * @param twoToneColor
     */
    IconService.prototype.getRenderedContent = function (icon, twoToneColor) {
        var _this = this;
        // If `icon` is a `IconDefinition`, go to the next step. If not, try to fetch it from cache.
        var definitionOrNull = isIconDefinition(icon)
            ? icon
            : this._svgDefinitions.get(icon) || null;
        // If `icon` is a `IconDefinition` of successfully fetch, wrap it in an `Observable`.
        // Otherwise try to fetch it from remote.
        var $iconDefinition = definitionOrNull
            ? rxof(definitionOrNull)
            : this._loadIconDynamically(icon);
        // If finally get an `IconDefinition`, render and return it. Otherwise throw an error.
        return $iconDefinition.pipe(map(function (i) {
            if (!i) {
                throw IconNotFoundError(icon);
            }
            return _this._loadSVGFromCacheOrCreateNew(i, twoToneColor);
        }));
    };
    IconService.prototype.getCachedIcons = function () {
        return this._svgDefinitions;
    };
    /**
     * Get raw svg and assemble a `IconDefinition` object.
     * @param type
     */
    IconService.prototype._loadIconDynamically = function (type) {
        var _this = this;
        // If developer doesn't provide HTTP module nor enable jsonp loading, just throw an error.
        if (!this._http && !this._enableJsonpLoading) {
            return rxof(HttpModuleNotImport());
        }
        // If multi directive ask for the same icon at the same time,
        // request should only be fired once.
        var inProgress = this._inProgressFetches.get(type);
        if (!inProgress) {
            var _a = __read(getNameAndNamespace(type), 2), name_1 = _a[0], namespace = _a[1];
            // If the string has a namespace within, create a simple `IconDefinition`.
            var icon_1 = namespace
                ? { name: type, icon: '' }
                : getIconDefinitionFromAbbr(name_1);
            var suffix = this._enableJsonpLoading ? '.js' : '.svg';
            var url = (namespace
                ? this._assetsUrlRoot + "assets/" + namespace + "/" + name_1
                : this._assetsUrlRoot + "assets/" + icon_1.theme + "/" + icon_1.name) + suffix;
            var safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
            if (!safeUrl) {
                throw UrlNotSafeError(url);
            }
            var source = !this._enableJsonpLoading
                ? this._http
                    .get(safeUrl, { responseType: 'text' })
                    .pipe(map(function (literal) { return (__assign(__assign({}, icon_1), { icon: literal })); }))
                : this._loadIconDynamicallyWithJsonp(icon_1, safeUrl);
            inProgress = source.pipe(tap(function (definition) { return _this.addIcon(definition); }), finalize(function () { return _this._inProgressFetches.delete(type); }), catchError(function () { return rxof(null); }), share());
            this._inProgressFetches.set(type, inProgress);
        }
        return inProgress;
    };
    IconService.prototype._loadIconDynamicallyWithJsonp = function (icon, url) {
        var _this = this;
        return new Observable(function (subscriber) {
            var loader = _this._document.createElement('script');
            var timer = setTimeout(function () {
                clean();
                subscriber.error(DynamicLoadingTimeoutError());
            }, 6000);
            loader.src = url;
            function clean() {
                loader.parentNode.removeChild(loader);
                clearTimeout(timer);
            }
            _this._document.body.appendChild(loader);
            _this._jsonpIconLoad$
                .pipe(filter(function (i) { return i.name === icon.name && i.theme === icon.theme; }), take(1))
                .subscribe(function (i) {
                subscriber.next(i);
                clean();
            });
        });
    };
    /**
     * Render a new `SVGElement` for a given `IconDefinition`, or make a copy from cache.
     * @param icon
     * @param twoToneColor
     */
    IconService.prototype._loadSVGFromCacheOrCreateNew = function (icon, twoToneColor) {
        var svg;
        var pri = twoToneColor || this._twoToneColorPalette.primaryColor;
        var sec = getSecondaryColor(pri) || this._twoToneColorPalette.secondaryColor;
        var key = icon.theme === 'twotone'
            ? withSuffixAndColor(icon.name, icon.theme, pri, sec)
            : icon.theme === undefined
                ? icon.name
                : withSuffix(icon.name, icon.theme);
        // Try to make a copy from cache.
        var cached = this._svgRenderedDefinitions.get(key);
        if (cached) {
            svg = cached.icon;
        }
        else {
            svg = this._setSVGAttribute(this._colorizeSVGIcon(
            // Icons provided by ant design should be refined to remove preset colors.
            this._createSVGElementFromString(hasNamespace(icon.name) ? icon.icon : replaceFillColor(icon.icon)), icon.theme === 'twotone', pri, sec));
            // Cache it.
            this._svgRenderedDefinitions.set(key, __assign(__assign({}, icon), { icon: svg }));
        }
        return cloneSVG(svg);
    };
    IconService.prototype._createSVGElementFromString = function (str) {
        var div = this._document.createElement('div');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw SVGTagNotFoundError;
        }
        return svg;
    };
    IconService.prototype._setSVGAttribute = function (svg) {
        this._renderer.setAttribute(svg, 'width', '1em');
        this._renderer.setAttribute(svg, 'height', '1em');
        return svg;
    };
    IconService.prototype._colorizeSVGIcon = function (svg, twotone, pri, sec) {
        if (twotone) {
            var children = svg.childNodes;
            var length_1 = children.length;
            for (var i = 0; i < length_1; i++) {
                var child = children[i];
                if (child.getAttribute('fill') === 'secondaryColor') {
                    this._renderer.setAttribute(child, 'fill', sec);
                }
                else {
                    this._renderer.setAttribute(child, 'fill', pri);
                }
            }
        }
        this._renderer.setAttribute(svg, 'fill', 'currentColor');
        return svg;
    };
    IconService.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: HttpBackend, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: DomSanitizer }
    ]; };
    IconService = __decorate([
        Injectable(),
        __param(1, Optional()),
        __param(2, Optional()), __param(2, Inject(DOCUMENT))
    ], IconService);
    return IconService;
}());
export { IconService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudC9pY29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsRUFDUixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixHQUFHLEVBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQVF4QixPQUFPLEVBQ0wsUUFBUSxFQUNSLHlCQUF5QixFQUN6QixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLElBQUksRUFDSixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ25CLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQiwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDaEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUc3QztJQWtERSxxQkFDWSxnQkFBa0MsRUFDdEIsUUFBcUI7SUFDM0Msa0NBQWtDO0lBQ00s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QU0sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6RCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7O2dCQTVRNkIsZ0JBQWdCO2dCQUNaLFdBQVcsdUJBQTFDLFFBQVE7Z0RBRVIsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFRO2dCQUNQLFlBQVk7O0lBdkR4QixXQUFXO1FBRHZCLFVBQVUsRUFBRTtRQXFEUixXQUFBLFFBQVEsRUFBRSxDQUFBO1FBRVYsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BdERwQixXQUFXLENBZ1V2QjtJQUFELGtCQUFDO0NBQUEsQUFoVUQsSUFnVUM7U0FoVVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBCYWNrZW5kLCBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgb2YgYXMgcnhvZiwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZmlsdGVyLFxuICBmaW5hbGl6ZSxcbiAgbWFwLFxuICBzaGFyZSxcbiAgdGFrZSxcbiAgdGFwXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENhY2hlZEljb25EZWZpbml0aW9uLFxuICBJY29uRGVmaW5pdGlvbixcbiAgVGhlbWVUeXBlLFxuICBUd29Ub25lQ29sb3JQYWxldHRlLFxuICBUd29Ub25lQ29sb3JQYWxldHRlU2V0dGVyXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7XG4gIGNsb25lU1ZHLFxuICBnZXRJY29uRGVmaW5pdGlvbkZyb21BYmJyLFxuICBnZXROYW1lQW5kTmFtZXNwYWNlLFxuICBnZXRTZWNvbmRhcnlDb2xvcixcbiAgaGFzTmFtZXNwYWNlLFxuICBpc0ljb25EZWZpbml0aW9uLFxuICByZXBsYWNlRmlsbENvbG9yLFxuICB3YXJuLFxuICB3aXRoU3VmZml4LFxuICB3aXRoU3VmZml4QW5kQ29sb3Jcbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgRHluYW1pY0xvYWRpbmdUaW1lb3V0RXJyb3IsXG4gIEh0dHBNb2R1bGVOb3RJbXBvcnQsXG4gIEljb25Ob3RGb3VuZEVycm9yLFxuICBOYW1lU3BhY2VJc05vdFNwZWNpZnlFcnJvcixcbiAgU1ZHVGFnTm90Rm91bmRFcnJvcixcbiAgVXJsTm90U2FmZUVycm9yXG59IGZyb20gJy4vaWNvbi5lcnJvcic7XG5cbmNvbnN0IEpTT05QX0hBTkRMRVJfTkFNRSA9ICdfX2FudF9pY29uX2xvYWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSWNvblNlcnZpY2Uge1xuICBkZWZhdWx0VGhlbWU6IFRoZW1lVHlwZSA9ICdvdXRsaW5lJztcblxuICBzZXQgdHdvVG9uZUNvbG9yKHtcbiAgICBwcmltYXJ5Q29sb3IsXG4gICAgc2Vjb25kYXJ5Q29sb3JcbiAgfTogVHdvVG9uZUNvbG9yUGFsZXR0ZVNldHRlcikge1xuICAgIHRoaXMuX3R3b1RvbmVDb2xvclBhbGV0dGUucHJpbWFyeUNvbG9yID0gcHJpbWFyeUNvbG9yO1xuICAgIHRoaXMuX3R3b1RvbmVDb2xvclBhbGV0dGUuc2Vjb25kYXJ5Q29sb3IgPVxuICAgICAgc2Vjb25kYXJ5Q29sb3IgfHwgZ2V0U2Vjb25kYXJ5Q29sb3IocHJpbWFyeUNvbG9yKTtcbiAgfVxuXG4gIGdldCB0d29Ub25lQ29sb3IoKTogVHdvVG9uZUNvbG9yUGFsZXR0ZVNldHRlciB7XG4gICAgLy8gTWFrZSBhIGNvcHkgdG8gYXZvaWQgdW5leHBlY3RlZCBjaGFuZ2VzLlxuICAgIHJldHVybiB7IC4uLnRoaXMuX3R3b1RvbmVDb2xvclBhbGV0dGUgfSBhcyBUd29Ub25lQ29sb3JQYWxldHRlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcm90ZWN0ZWQgX2h0dHA6IEh0dHBDbGllbnQ7XG5cbiAgLyoqXG4gICAqIEFsbCBpY29uIGRlZmluaXRpb25zIHdvdWxkIGJlIHJlZ2lzdGVyZWQgaGVyZS5cbiAgICovXG4gIHByb3RlY3RlZCByZWFkb25seSBfc3ZnRGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgSWNvbkRlZmluaXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIENhY2hlIGFsbCByZW5kZXJlZCBpY29ucy4gSWNvbnMgYXJlIGlkZW50aWZpZWQgYnkgbmFtZSwgdGhlbWUsXG4gICAqIGFuZCBmb3IgdHdvdG9uZSBpY29ucywgcHJpbWFyeSBjb2xvciBhbmQgc2Vjb25kYXJ5IGNvbG9yLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdmdSZW5kZXJlZERlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIENhY2hlZEljb25EZWZpbml0aW9uPigpO1xuXG4gIHByb3RlY3RlZCBfaW5Qcm9ncmVzc0ZldGNoZXMgPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICBPYnNlcnZhYmxlPEljb25EZWZpbml0aW9uIHwgbnVsbD5cbiAgPigpO1xuXG4gIC8qKlxuICAgKiBVcmwgcHJlZml4IGZvciBmZXRjaGluZyBpbmxpbmUgU1ZHIGJ5IGR5bmFtaWMgaW1wb3J0aW5nLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9hc3NldHNVcmxSb290ID0gJyc7XG5cbiAgcHJvdGVjdGVkIF90d29Ub25lQ29sb3JQYWxldHRlOiBUd29Ub25lQ29sb3JQYWxldHRlID0ge1xuICAgIHByaW1hcnlDb2xvcjogJyMzMzMzMzMnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0U2RTZFNidcbiAgfTtcblxuICAvKiogQSBmbGFnIGluZGljYXRlcyB3aGV0aGVyIGpzb25wIGxvYWRpbmcgaXMgZW5hYmxlZC4gKi9cbiAgcHJpdmF0ZSBfZW5hYmxlSnNvbnBMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2pzb25wSWNvbkxvYWQkID0gbmV3IFN1YmplY3Q8SWNvbkRlZmluaXRpb24+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIF9oYW5kbGVyOiBIdHRwQmFja2VuZCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIF9kb2N1bWVudDogYW55LFxuICAgIHByb3RlY3RlZCBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICApIHtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgICBpZiAodGhpcy5faGFuZGxlcikge1xuICAgICAgdGhpcy5faHR0cCA9IG5ldyBIdHRwQ2xpZW50KHRoaXMuX2hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHRoaXMgbWV0aG9kIHRvIHN3aXRjaCB0byBqc29ucCBsaWtlIGxvYWRpbmcuXG4gICAqL1xuICB1c2VKc29ucExvYWRpbmcoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9lbmFibGVKc29ucExvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2VuYWJsZUpzb25wTG9hZGluZyA9IHRydWU7XG5cbiAgICAgIHdpbmRvd1tKU09OUF9IQU5ETEVSX05BTUVdID0gKGljb246IEljb25EZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2pzb25wSWNvbkxvYWQkLm5leHQoaWNvbik7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdZb3UgYXJlIGFscmVhZHkgdXNpbmcganNvbnAgbG9hZGluZy4nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBwcmVmaXggb2YgdGhlIGlubGluZSBzdmcgcmVzb3VyY2VzLCBzbyB0aGV5IGNvdWxkIGJlIGRlcGxveWVkIGVsc2V3aGVyZSwgbGlrZSBDRE4uXG4gICAqIEBwYXJhbSBwcmVmaXhcbiAgICovXG4gIGNoYW5nZUFzc2V0c1NvdXJjZShwcmVmaXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2Fzc2V0c1VybFJvb3QgPSBwcmVmaXguZW5kc1dpdGgoJy8nKSA/IHByZWZpeCA6IHByZWZpeCArICcvJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaWNvbnMgcHJvdmlkZWQgYnkgYW50IGRlc2lnbi5cbiAgICogQHBhcmFtIGljb25zXG4gICAqL1xuICBhZGRJY29uKC4uLmljb25zOiBJY29uRGVmaW5pdGlvbltdKTogdm9pZCB7XG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IHtcbiAgICAgIHRoaXMuX3N2Z0RlZmluaXRpb25zLnNldCh3aXRoU3VmZml4KGljb24ubmFtZSwgaWNvbi50aGVtZSksIGljb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGljb24uIE5hbWVzcGFjZSBpcyByZXF1aXJlZC5cbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGxpdGVyYWxcbiAgICovXG4gIGFkZEljb25MaXRlcmFsKHR5cGU6IHN0cmluZywgbGl0ZXJhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgW18sIG5hbWVzcGFjZV0gPSBnZXROYW1lQW5kTmFtZXNwYWNlKHR5cGUpO1xuICAgIGlmICghbmFtZXNwYWNlKSB7XG4gICAgICB0aHJvdyBOYW1lU3BhY2VJc05vdFNwZWNpZnlFcnJvcigpO1xuICAgIH1cbiAgICB0aGlzLmFkZEljb24oeyBuYW1lOiB0eXBlLCBpY29uOiBsaXRlcmFsIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgY2FjaGUuXG4gICAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zdmdEZWZpbml0aW9ucy5jbGVhcigpO1xuICAgIHRoaXMuX3N2Z1JlbmRlcmVkRGVmaW5pdGlvbnMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZW5kZXJlZCBgU1ZHRWxlbWVudGAuXG4gICAqIEBwYXJhbSBpY29uXG4gICAqIEBwYXJhbSB0d29Ub25lQ29sb3JcbiAgICovXG4gIGdldFJlbmRlcmVkQ29udGVudChcbiAgICBpY29uOiBJY29uRGVmaW5pdGlvbiB8IHN0cmluZyxcbiAgICB0d29Ub25lQ29sb3I/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PiB7XG4gICAgLy8gSWYgYGljb25gIGlzIGEgYEljb25EZWZpbml0aW9uYCwgZ28gdG8gdGhlIG5leHQgc3RlcC4gSWYgbm90LCB0cnkgdG8gZmV0Y2ggaXQgZnJvbSBjYWNoZS5cbiAgICBjb25zdCBkZWZpbml0aW9uT3JOdWxsOiBJY29uRGVmaW5pdGlvbiB8IG51bGwgPSBpc0ljb25EZWZpbml0aW9uKGljb24pXG4gICAgICA/IChpY29uIGFzIEljb25EZWZpbml0aW9uKVxuICAgICAgOiB0aGlzLl9zdmdEZWZpbml0aW9ucy5nZXQoaWNvbikgfHwgbnVsbDtcblxuICAgIC8vIElmIGBpY29uYCBpcyBhIGBJY29uRGVmaW5pdGlvbmAgb2Ygc3VjY2Vzc2Z1bGx5IGZldGNoLCB3cmFwIGl0IGluIGFuIGBPYnNlcnZhYmxlYC5cbiAgICAvLyBPdGhlcndpc2UgdHJ5IHRvIGZldGNoIGl0IGZyb20gcmVtb3RlLlxuICAgIGNvbnN0ICRpY29uRGVmaW5pdGlvbiA9IGRlZmluaXRpb25Pck51bGxcbiAgICAgID8gcnhvZihkZWZpbml0aW9uT3JOdWxsKVxuICAgICAgOiB0aGlzLl9sb2FkSWNvbkR5bmFtaWNhbGx5KGljb24gYXMgc3RyaW5nKTtcblxuICAgIC8vIElmIGZpbmFsbHkgZ2V0IGFuIGBJY29uRGVmaW5pdGlvbmAsIHJlbmRlciBhbmQgcmV0dXJuIGl0LiBPdGhlcndpc2UgdGhyb3cgYW4gZXJyb3IuXG4gICAgcmV0dXJuICRpY29uRGVmaW5pdGlvbi5waXBlKFxuICAgICAgbWFwKGkgPT4ge1xuICAgICAgICBpZiAoIWkpIHtcbiAgICAgICAgICB0aHJvdyBJY29uTm90Rm91bmRFcnJvcihpY29uIGFzIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRTVkdGcm9tQ2FjaGVPckNyZWF0ZU5ldyhpLCB0d29Ub25lQ29sb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0Q2FjaGVkSWNvbnMoKTogTWFwPHN0cmluZywgSWNvbkRlZmluaXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5fc3ZnRGVmaW5pdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHJhdyBzdmcgYW5kIGFzc2VtYmxlIGEgYEljb25EZWZpbml0aW9uYCBvYmplY3QuXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xvYWRJY29uRHluYW1pY2FsbHkoXG4gICAgdHlwZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8SWNvbkRlZmluaXRpb24gfCBudWxsPiB7XG4gICAgLy8gSWYgZGV2ZWxvcGVyIGRvZXNuJ3QgcHJvdmlkZSBIVFRQIG1vZHVsZSBub3IgZW5hYmxlIGpzb25wIGxvYWRpbmcsIGp1c3QgdGhyb3cgYW4gZXJyb3IuXG4gICAgaWYgKCF0aGlzLl9odHRwICYmICF0aGlzLl9lbmFibGVKc29ucExvYWRpbmcpIHtcbiAgICAgIHJldHVybiByeG9mKEh0dHBNb2R1bGVOb3RJbXBvcnQoKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgbXVsdGkgZGlyZWN0aXZlIGFzayBmb3IgdGhlIHNhbWUgaWNvbiBhdCB0aGUgc2FtZSB0aW1lLFxuICAgIC8vIHJlcXVlc3Qgc2hvdWxkIG9ubHkgYmUgZmlyZWQgb25jZS5cbiAgICBsZXQgaW5Qcm9ncmVzcyA9IHRoaXMuX2luUHJvZ3Jlc3NGZXRjaGVzLmdldCh0eXBlKTtcblxuICAgIGlmICghaW5Qcm9ncmVzcykge1xuICAgICAgY29uc3QgW25hbWUsIG5hbWVzcGFjZV0gPSBnZXROYW1lQW5kTmFtZXNwYWNlKHR5cGUpO1xuXG4gICAgICAvLyBJZiB0aGUgc3RyaW5nIGhhcyBhIG5hbWVzcGFjZSB3aXRoaW4sIGNyZWF0ZSBhIHNpbXBsZSBgSWNvbkRlZmluaXRpb25gLlxuICAgICAgY29uc3QgaWNvbjogSWNvbkRlZmluaXRpb24gPSBuYW1lc3BhY2VcbiAgICAgICAgPyB7IG5hbWU6IHR5cGUsIGljb246ICcnIH1cbiAgICAgICAgOiBnZXRJY29uRGVmaW5pdGlvbkZyb21BYmJyKG5hbWUpO1xuXG4gICAgICBjb25zdCBzdWZmaXggPSB0aGlzLl9lbmFibGVKc29ucExvYWRpbmcgPyAnLmpzJyA6ICcuc3ZnJztcbiAgICAgIGNvbnN0IHVybCA9XG4gICAgICAgIChuYW1lc3BhY2VcbiAgICAgICAgICA/IGAke3RoaXMuX2Fzc2V0c1VybFJvb3R9YXNzZXRzLyR7bmFtZXNwYWNlfS8ke25hbWV9YFxuICAgICAgICAgIDogYCR7dGhpcy5fYXNzZXRzVXJsUm9vdH1hc3NldHMvJHtpY29uLnRoZW1lfS8ke2ljb24ubmFtZX1gKSArIHN1ZmZpeDtcblxuICAgICAgY29uc3Qgc2FmZVVybCA9IHRoaXMuc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5VUkwsIHVybCk7XG5cbiAgICAgIGlmICghc2FmZVVybCkge1xuICAgICAgICB0aHJvdyBVcmxOb3RTYWZlRXJyb3IodXJsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc291cmNlID0gIXRoaXMuX2VuYWJsZUpzb25wTG9hZGluZ1xuICAgICAgICA/IHRoaXMuX2h0dHBcbiAgICAgICAgICAgIC5nZXQoc2FmZVVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKGxpdGVyYWwgPT4gKHsgLi4uaWNvbiwgaWNvbjogbGl0ZXJhbCB9KSkpXG4gICAgICAgIDogdGhpcy5fbG9hZEljb25EeW5hbWljYWxseVdpdGhKc29ucChpY29uLCBzYWZlVXJsKTtcblxuICAgICAgaW5Qcm9ncmVzcyA9IHNvdXJjZS5waXBlKFxuICAgICAgICB0YXAoZGVmaW5pdGlvbiA9PiB0aGlzLmFkZEljb24oZGVmaW5pdGlvbikpLFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLl9pblByb2dyZXNzRmV0Y2hlcy5kZWxldGUodHlwZSkpLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHJ4b2YobnVsbCkpLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9pblByb2dyZXNzRmV0Y2hlcy5zZXQodHlwZSwgaW5Qcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluUHJvZ3Jlc3M7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2xvYWRJY29uRHluYW1pY2FsbHlXaXRoSnNvbnAoaWNvbjogSWNvbkRlZmluaXRpb24sIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxJY29uRGVmaW5pdGlvbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxJY29uRGVmaW5pdGlvbj4oc3Vic2NyaWJlciA9PiB7XG4gICAgICBjb25zdCBsb2FkZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFuKCk7XG4gICAgICAgIHN1YnNjcmliZXIuZXJyb3IoRHluYW1pY0xvYWRpbmdUaW1lb3V0RXJyb3IoKSk7XG4gICAgICB9LCA2MDAwKTtcblxuICAgICAgbG9hZGVyLnNyYyA9IHVybDtcblxuICAgICAgZnVuY3Rpb24gY2xlYW4oKTogdm9pZCB7XG4gICAgICAgIGxvYWRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRlcik7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyKTtcbiAgICAgIHRoaXMuX2pzb25wSWNvbkxvYWQkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihpID0+IGkubmFtZSA9PT0gaWNvbi5uYW1lICYmIGkudGhlbWUgPT09IGljb24udGhlbWUpLFxuICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoaSA9PiB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaSk7XG4gICAgICAgICAgICBjbGVhbigpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBhIG5ldyBgU1ZHRWxlbWVudGAgZm9yIGEgZ2l2ZW4gYEljb25EZWZpbml0aW9uYCwgb3IgbWFrZSBhIGNvcHkgZnJvbSBjYWNoZS5cbiAgICogQHBhcmFtIGljb25cbiAgICogQHBhcmFtIHR3b1RvbmVDb2xvclxuICAgKi9cbiAgcHJvdGVjdGVkIF9sb2FkU1ZHRnJvbUNhY2hlT3JDcmVhdGVOZXcoXG4gICAgaWNvbjogSWNvbkRlZmluaXRpb24sXG4gICAgdHdvVG9uZUNvbG9yPzogc3RyaW5nXG4gICk6IFNWR0VsZW1lbnQge1xuICAgIGxldCBzdmc6IFNWR0VsZW1lbnQ7XG5cbiAgICBjb25zdCBwcmkgPSB0d29Ub25lQ29sb3IgfHwgdGhpcy5fdHdvVG9uZUNvbG9yUGFsZXR0ZS5wcmltYXJ5Q29sb3I7XG4gICAgY29uc3Qgc2VjID1cbiAgICAgIGdldFNlY29uZGFyeUNvbG9yKHByaSkgfHwgdGhpcy5fdHdvVG9uZUNvbG9yUGFsZXR0ZS5zZWNvbmRhcnlDb2xvcjtcbiAgICBjb25zdCBrZXkgPVxuICAgICAgaWNvbi50aGVtZSA9PT0gJ3R3b3RvbmUnXG4gICAgICAgID8gd2l0aFN1ZmZpeEFuZENvbG9yKGljb24ubmFtZSwgaWNvbi50aGVtZSwgcHJpLCBzZWMpXG4gICAgICAgIDogaWNvbi50aGVtZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gaWNvbi5uYW1lXG4gICAgICAgIDogd2l0aFN1ZmZpeChpY29uLm5hbWUsIGljb24udGhlbWUpO1xuXG4gICAgLy8gVHJ5IHRvIG1ha2UgYSBjb3B5IGZyb20gY2FjaGUuXG4gICAgY29uc3QgY2FjaGVkID0gdGhpcy5fc3ZnUmVuZGVyZWREZWZpbml0aW9ucy5nZXQoa2V5KTtcblxuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIHN2ZyA9IGNhY2hlZC5pY29uO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdmcgPSB0aGlzLl9zZXRTVkdBdHRyaWJ1dGUoXG4gICAgICAgIHRoaXMuX2NvbG9yaXplU1ZHSWNvbihcbiAgICAgICAgICAvLyBJY29ucyBwcm92aWRlZCBieSBhbnQgZGVzaWduIHNob3VsZCBiZSByZWZpbmVkIHRvIHJlbW92ZSBwcmVzZXQgY29sb3JzLlxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVNWR0VsZW1lbnRGcm9tU3RyaW5nKFxuICAgICAgICAgICAgaGFzTmFtZXNwYWNlKGljb24ubmFtZSkgPyBpY29uLmljb24gOiByZXBsYWNlRmlsbENvbG9yKGljb24uaWNvbilcbiAgICAgICAgICApLFxuICAgICAgICAgIGljb24udGhlbWUgPT09ICd0d290b25lJyxcbiAgICAgICAgICBwcmksXG4gICAgICAgICAgc2VjXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICAvLyBDYWNoZSBpdC5cbiAgICAgIHRoaXMuX3N2Z1JlbmRlcmVkRGVmaW5pdGlvbnMuc2V0KGtleSwge1xuICAgICAgICAuLi5pY29uLFxuICAgICAgICBpY29uOiBzdmdcbiAgICAgIH0gYXMgQ2FjaGVkSWNvbkRlZmluaXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZVNWRyhzdmcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVTVkdFbGVtZW50RnJvbVN0cmluZyhzdHI6IHN0cmluZyk6IFNWR0VsZW1lbnQge1xuICAgIGNvbnN0IGRpdiA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBzdHI7XG4gICAgY29uc3Qgc3ZnOiBTVkdFbGVtZW50ID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgIGlmICghc3ZnKSB7XG4gICAgICB0aHJvdyBTVkdUYWdOb3RGb3VuZEVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gc3ZnO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zZXRTVkdBdHRyaWJ1dGUoc3ZnOiBTVkdFbGVtZW50KTogU1ZHRWxlbWVudCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ3dpZHRoJywgJzFlbScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICdoZWlnaHQnLCAnMWVtJyk7XG4gICAgcmV0dXJuIHN2ZztcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29sb3JpemVTVkdJY29uKFxuICAgIHN2ZzogU1ZHRWxlbWVudCxcbiAgICB0d290b25lOiBib29sZWFuLFxuICAgIHByaTogc3RyaW5nLFxuICAgIHNlYzogc3RyaW5nXG4gICk6IFNWR0VsZW1lbnQge1xuICAgIGlmICh0d290b25lKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHN2Zy5jaGlsZE5vZGVzO1xuICAgICAgY29uc3QgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZDogSFRNTEVsZW1lbnQgPSBjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnZmlsbCcpID09PSAnc2Vjb25kYXJ5Q29sb3InKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGNoaWxkLCAnZmlsbCcsIHNlYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGNoaWxkLCAnZmlsbCcsIHByaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ2ZpbGwnLCAnY3VycmVudENvbG9yJyk7XG4gICAgcmV0dXJuIHN2ZztcbiAgfVxufVxuIl19