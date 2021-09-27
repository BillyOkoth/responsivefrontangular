import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, Renderer2, RendererFactory2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of as rxof, Observable, Subject } from 'rxjs';
import { catchError, filter, finalize, map, share, take, tap } from 'rxjs/operators';
import { cloneSVG, getIconDefinitionFromAbbr, getNameAndNamespace, getSecondaryColor, hasNamespace, isIconDefinition, replaceFillColor, warn, withSuffix, withSuffixAndColor } from '../utils';
import { DynamicLoadingTimeoutError, HttpModuleNotImport, IconNotFoundError, NameSpaceIsNotSpecifyError, SVGTagNotFoundError, UrlNotSafeError } from './icon.error';
const JSONP_HANDLER_NAME = '__ant_icon_load';
let IconService = class IconService {
    constructor(_rendererFactory, _handler, 
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
    set twoToneColor({ primaryColor, secondaryColor }) {
        this._twoToneColorPalette.primaryColor = primaryColor;
        this._twoToneColorPalette.secondaryColor =
            secondaryColor || getSecondaryColor(primaryColor);
    }
    get twoToneColor() {
        // Make a copy to avoid unexpected changes.
        return Object.assign({}, this._twoToneColorPalette);
    }
    /**
     * Call this method to switch to jsonp like loading.
     */
    useJsonpLoading() {
        if (!this._enableJsonpLoading) {
            this._enableJsonpLoading = true;
            window[JSONP_HANDLER_NAME] = (icon) => {
                this._jsonpIconLoad$.next(icon);
            };
        }
        else {
            warn('You are already using jsonp loading.');
        }
    }
    /**
     * Change the prefix of the inline svg resources, so they could be deployed elsewhere, like CDN.
     * @param prefix
     */
    changeAssetsSource(prefix) {
        this._assetsUrlRoot = prefix.endsWith('/') ? prefix : prefix + '/';
    }
    /**
     * Add icons provided by ant design.
     * @param icons
     */
    addIcon(...icons) {
        icons.forEach(icon => {
            this._svgDefinitions.set(withSuffix(icon.name, icon.theme), icon);
        });
    }
    /**
     * Register an icon. Namespace is required.
     * @param type
     * @param literal
     */
    addIconLiteral(type, literal) {
        const [_, namespace] = getNameAndNamespace(type);
        if (!namespace) {
            throw NameSpaceIsNotSpecifyError();
        }
        this.addIcon({ name: type, icon: literal });
    }
    /**
     * Remove all cache.
     */
    clear() {
        this._svgDefinitions.clear();
        this._svgRenderedDefinitions.clear();
    }
    /**
     * Get a rendered `SVGElement`.
     * @param icon
     * @param twoToneColor
     */
    getRenderedContent(icon, twoToneColor) {
        // If `icon` is a `IconDefinition`, go to the next step. If not, try to fetch it from cache.
        const definitionOrNull = isIconDefinition(icon)
            ? icon
            : this._svgDefinitions.get(icon) || null;
        // If `icon` is a `IconDefinition` of successfully fetch, wrap it in an `Observable`.
        // Otherwise try to fetch it from remote.
        const $iconDefinition = definitionOrNull
            ? rxof(definitionOrNull)
            : this._loadIconDynamically(icon);
        // If finally get an `IconDefinition`, render and return it. Otherwise throw an error.
        return $iconDefinition.pipe(map(i => {
            if (!i) {
                throw IconNotFoundError(icon);
            }
            return this._loadSVGFromCacheOrCreateNew(i, twoToneColor);
        }));
    }
    getCachedIcons() {
        return this._svgDefinitions;
    }
    /**
     * Get raw svg and assemble a `IconDefinition` object.
     * @param type
     */
    _loadIconDynamically(type) {
        // If developer doesn't provide HTTP module nor enable jsonp loading, just throw an error.
        if (!this._http && !this._enableJsonpLoading) {
            return rxof(HttpModuleNotImport());
        }
        // If multi directive ask for the same icon at the same time,
        // request should only be fired once.
        let inProgress = this._inProgressFetches.get(type);
        if (!inProgress) {
            const [name, namespace] = getNameAndNamespace(type);
            // If the string has a namespace within, create a simple `IconDefinition`.
            const icon = namespace
                ? { name: type, icon: '' }
                : getIconDefinitionFromAbbr(name);
            const suffix = this._enableJsonpLoading ? '.js' : '.svg';
            const url = (namespace
                ? `${this._assetsUrlRoot}assets/${namespace}/${name}`
                : `${this._assetsUrlRoot}assets/${icon.theme}/${icon.name}`) + suffix;
            const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
            if (!safeUrl) {
                throw UrlNotSafeError(url);
            }
            const source = !this._enableJsonpLoading
                ? this._http
                    .get(safeUrl, { responseType: 'text' })
                    .pipe(map(literal => (Object.assign(Object.assign({}, icon), { icon: literal }))))
                : this._loadIconDynamicallyWithJsonp(icon, safeUrl);
            inProgress = source.pipe(tap(definition => this.addIcon(definition)), finalize(() => this._inProgressFetches.delete(type)), catchError(() => rxof(null)), share());
            this._inProgressFetches.set(type, inProgress);
        }
        return inProgress;
    }
    _loadIconDynamicallyWithJsonp(icon, url) {
        return new Observable(subscriber => {
            const loader = this._document.createElement('script');
            const timer = setTimeout(() => {
                clean();
                subscriber.error(DynamicLoadingTimeoutError());
            }, 6000);
            loader.src = url;
            function clean() {
                loader.parentNode.removeChild(loader);
                clearTimeout(timer);
            }
            this._document.body.appendChild(loader);
            this._jsonpIconLoad$
                .pipe(filter(i => i.name === icon.name && i.theme === icon.theme), take(1))
                .subscribe(i => {
                subscriber.next(i);
                clean();
            });
        });
    }
    /**
     * Render a new `SVGElement` for a given `IconDefinition`, or make a copy from cache.
     * @param icon
     * @param twoToneColor
     */
    _loadSVGFromCacheOrCreateNew(icon, twoToneColor) {
        let svg;
        const pri = twoToneColor || this._twoToneColorPalette.primaryColor;
        const sec = getSecondaryColor(pri) || this._twoToneColorPalette.secondaryColor;
        const key = icon.theme === 'twotone'
            ? withSuffixAndColor(icon.name, icon.theme, pri, sec)
            : icon.theme === undefined
                ? icon.name
                : withSuffix(icon.name, icon.theme);
        // Try to make a copy from cache.
        const cached = this._svgRenderedDefinitions.get(key);
        if (cached) {
            svg = cached.icon;
        }
        else {
            svg = this._setSVGAttribute(this._colorizeSVGIcon(
            // Icons provided by ant design should be refined to remove preset colors.
            this._createSVGElementFromString(hasNamespace(icon.name) ? icon.icon : replaceFillColor(icon.icon)), icon.theme === 'twotone', pri, sec));
            // Cache it.
            this._svgRenderedDefinitions.set(key, Object.assign(Object.assign({}, icon), { icon: svg }));
        }
        return cloneSVG(svg);
    }
    _createSVGElementFromString(str) {
        const div = this._document.createElement('div');
        div.innerHTML = str;
        const svg = div.querySelector('svg');
        if (!svg) {
            throw SVGTagNotFoundError;
        }
        return svg;
    }
    _setSVGAttribute(svg) {
        this._renderer.setAttribute(svg, 'width', '1em');
        this._renderer.setAttribute(svg, 'height', '1em');
        return svg;
    }
    _colorizeSVGIcon(svg, twotone, pri, sec) {
        if (twotone) {
            const children = svg.childNodes;
            const length = children.length;
            for (let i = 0; i < length; i++) {
                const child = children[i];
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
    }
};
IconService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: HttpBackend, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: DomSanitizer }
];
IconService = __decorate([
    Injectable(),
    __param(1, Optional()),
    __param(2, Optional()), __param(2, Inject(DOCUMENT))
], IconService);
export { IconService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudC9pY29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsRUFDUixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixHQUFHLEVBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQVF4QixPQUFPLEVBQ0wsUUFBUSxFQUNSLHlCQUF5QixFQUN6QixtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLElBQUksRUFDSixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ25CLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQiwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDaEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUc3QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBa0R0QixZQUNZLGdCQUFrQyxFQUN0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WUFBSSxNQUFNLFNBQUMsUUFBUTtZQUNQLFlBQVk7O0FBdkR4QixXQUFXO0lBRHZCLFVBQVUsRUFBRTtJQXFEUixXQUFBLFFBQVEsRUFBRSxDQUFBO0lBRVYsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBdERwQixXQUFXLENBZ1V2QjtTQWhVWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cEJhY2tlbmQsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBvZiBhcyByeG9mLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBmaWx0ZXIsXG4gIGZpbmFsaXplLFxuICBtYXAsXG4gIHNoYXJlLFxuICB0YWtlLFxuICB0YXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2FjaGVkSWNvbkRlZmluaXRpb24sXG4gIEljb25EZWZpbml0aW9uLFxuICBUaGVtZVR5cGUsXG4gIFR3b1RvbmVDb2xvclBhbGV0dGUsXG4gIFR3b1RvbmVDb2xvclBhbGV0dGVTZXR0ZXJcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgY2xvbmVTVkcsXG4gIGdldEljb25EZWZpbml0aW9uRnJvbUFiYnIsXG4gIGdldE5hbWVBbmROYW1lc3BhY2UsXG4gIGdldFNlY29uZGFyeUNvbG9yLFxuICBoYXNOYW1lc3BhY2UsXG4gIGlzSWNvbkRlZmluaXRpb24sXG4gIHJlcGxhY2VGaWxsQ29sb3IsXG4gIHdhcm4sXG4gIHdpdGhTdWZmaXgsXG4gIHdpdGhTdWZmaXhBbmRDb2xvclxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge1xuICBEeW5hbWljTG9hZGluZ1RpbWVvdXRFcnJvcixcbiAgSHR0cE1vZHVsZU5vdEltcG9ydCxcbiAgSWNvbk5vdEZvdW5kRXJyb3IsXG4gIE5hbWVTcGFjZUlzTm90U3BlY2lmeUVycm9yLFxuICBTVkdUYWdOb3RGb3VuZEVycm9yLFxuICBVcmxOb3RTYWZlRXJyb3Jcbn0gZnJvbSAnLi9pY29uLmVycm9yJztcblxuY29uc3QgSlNPTlBfSEFORExFUl9OQU1FID0gJ19fYW50X2ljb25fbG9hZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJY29uU2VydmljZSB7XG4gIGRlZmF1bHRUaGVtZTogVGhlbWVUeXBlID0gJ291dGxpbmUnO1xuXG4gIHNldCB0d29Ub25lQ29sb3Ioe1xuICAgIHByaW1hcnlDb2xvcixcbiAgICBzZWNvbmRhcnlDb2xvclxuICB9OiBUd29Ub25lQ29sb3JQYWxldHRlU2V0dGVyKSB7XG4gICAgdGhpcy5fdHdvVG9uZUNvbG9yUGFsZXR0ZS5wcmltYXJ5Q29sb3IgPSBwcmltYXJ5Q29sb3I7XG4gICAgdGhpcy5fdHdvVG9uZUNvbG9yUGFsZXR0ZS5zZWNvbmRhcnlDb2xvciA9XG4gICAgICBzZWNvbmRhcnlDb2xvciB8fCBnZXRTZWNvbmRhcnlDb2xvcihwcmltYXJ5Q29sb3IpO1xuICB9XG5cbiAgZ2V0IHR3b1RvbmVDb2xvcigpOiBUd29Ub25lQ29sb3JQYWxldHRlU2V0dGVyIHtcbiAgICAvLyBNYWtlIGEgY29weSB0byBhdm9pZCB1bmV4cGVjdGVkIGNoYW5nZXMuXG4gICAgcmV0dXJuIHsgLi4udGhpcy5fdHdvVG9uZUNvbG9yUGFsZXR0ZSB9IGFzIFR3b1RvbmVDb2xvclBhbGV0dGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByb3RlY3RlZCBfaHR0cDogSHR0cENsaWVudDtcblxuICAvKipcbiAgICogQWxsIGljb24gZGVmaW5pdGlvbnMgd291bGQgYmUgcmVnaXN0ZXJlZCBoZXJlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdmdEZWZpbml0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBJY29uRGVmaW5pdGlvbj4oKTtcblxuICAvKipcbiAgICogQ2FjaGUgYWxsIHJlbmRlcmVkIGljb25zLiBJY29ucyBhcmUgaWRlbnRpZmllZCBieSBuYW1lLCB0aGVtZSxcbiAgICogYW5kIGZvciB0d290b25lIGljb25zLCBwcmltYXJ5IGNvbG9yIGFuZCBzZWNvbmRhcnkgY29sb3IuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N2Z1JlbmRlcmVkRGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgQ2FjaGVkSWNvbkRlZmluaXRpb24+KCk7XG5cbiAgcHJvdGVjdGVkIF9pblByb2dyZXNzRmV0Y2hlcyA9IG5ldyBNYXA8XG4gICAgc3RyaW5nLFxuICAgIE9ic2VydmFibGU8SWNvbkRlZmluaXRpb24gfCBudWxsPlxuICA+KCk7XG5cbiAgLyoqXG4gICAqIFVybCBwcmVmaXggZm9yIGZldGNoaW5nIGlubGluZSBTVkcgYnkgZHluYW1pYyBpbXBvcnRpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2Fzc2V0c1VybFJvb3QgPSAnJztcblxuICBwcm90ZWN0ZWQgX3R3b1RvbmVDb2xvclBhbGV0dGU6IFR3b1RvbmVDb2xvclBhbGV0dGUgPSB7XG4gICAgcHJpbWFyeUNvbG9yOiAnIzMzMzMzMycsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRTZFNkU2J1xuICB9O1xuXG4gIC8qKiBBIGZsYWcgaW5kaWNhdGVzIHdoZXRoZXIganNvbnAgbG9hZGluZyBpcyBlbmFibGVkLiAqL1xuICBwcml2YXRlIF9lbmFibGVKc29ucExvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfanNvbnBJY29uTG9hZCQgPSBuZXcgU3ViamVjdDxJY29uRGVmaW5pdGlvbj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgX2hhbmRsZXI6IEh0dHBCYWNrZW5kLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgX2RvY3VtZW50OiBhbnksXG4gICAgcHJvdGVjdGVkIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuICAgIGlmICh0aGlzLl9oYW5kbGVyKSB7XG4gICAgICB0aGlzLl9odHRwID0gbmV3IEh0dHBDbGllbnQodGhpcy5faGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgdGhpcyBtZXRob2QgdG8gc3dpdGNoIHRvIGpzb25wIGxpa2UgbG9hZGluZy5cbiAgICovXG4gIHVzZUpzb25wTG9hZGluZygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2VuYWJsZUpzb25wTG9hZGluZykge1xuICAgICAgdGhpcy5fZW5hYmxlSnNvbnBMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgd2luZG93W0pTT05QX0hBTkRMRVJfTkFNRV0gPSAoaWNvbjogSWNvbkRlZmluaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fanNvbnBJY29uTG9hZCQubmV4dChpY29uKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ1lvdSBhcmUgYWxyZWFkeSB1c2luZyBqc29ucCBsb2FkaW5nLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIHByZWZpeCBvZiB0aGUgaW5saW5lIHN2ZyByZXNvdXJjZXMsIHNvIHRoZXkgY291bGQgYmUgZGVwbG95ZWQgZWxzZXdoZXJlLCBsaWtlIENETi5cbiAgICogQHBhcmFtIHByZWZpeFxuICAgKi9cbiAgY2hhbmdlQXNzZXRzU291cmNlKHByZWZpeDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXRzVXJsUm9vdCA9IHByZWZpeC5lbmRzV2l0aCgnLycpID8gcHJlZml4IDogcHJlZml4ICsgJy8nO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpY29ucyBwcm92aWRlZCBieSBhbnQgZGVzaWduLlxuICAgKiBAcGFyYW0gaWNvbnNcbiAgICovXG4gIGFkZEljb24oLi4uaWNvbnM6IEljb25EZWZpbml0aW9uW10pOiB2b2lkIHtcbiAgICBpY29ucy5mb3JFYWNoKGljb24gPT4ge1xuICAgICAgdGhpcy5fc3ZnRGVmaW5pdGlvbnMuc2V0KHdpdGhTdWZmaXgoaWNvbi5uYW1lLCBpY29uLnRoZW1lKSwgaWNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gaWNvbi4gTmFtZXNwYWNlIGlzIHJlcXVpcmVkLlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGl0ZXJhbFxuICAgKi9cbiAgYWRkSWNvbkxpdGVyYWwodHlwZTogc3RyaW5nLCBsaXRlcmFsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBbXywgbmFtZXNwYWNlXSA9IGdldE5hbWVBbmROYW1lc3BhY2UodHlwZSk7XG4gICAgaWYgKCFuYW1lc3BhY2UpIHtcbiAgICAgIHRocm93IE5hbWVTcGFjZUlzTm90U3BlY2lmeUVycm9yKCk7XG4gICAgfVxuICAgIHRoaXMuYWRkSWNvbih7IG5hbWU6IHR5cGUsIGljb246IGxpdGVyYWwgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjYWNoZS5cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX3N2Z0RlZmluaXRpb25zLmNsZWFyKCk7XG4gICAgdGhpcy5fc3ZnUmVuZGVyZWREZWZpbml0aW9ucy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHJlbmRlcmVkIGBTVkdFbGVtZW50YC5cbiAgICogQHBhcmFtIGljb25cbiAgICogQHBhcmFtIHR3b1RvbmVDb2xvclxuICAgKi9cbiAgZ2V0UmVuZGVyZWRDb250ZW50KFxuICAgIGljb246IEljb25EZWZpbml0aW9uIHwgc3RyaW5nLFxuICAgIHR3b1RvbmVDb2xvcj86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcbiAgICAvLyBJZiBgaWNvbmAgaXMgYSBgSWNvbkRlZmluaXRpb25gLCBnbyB0byB0aGUgbmV4dCBzdGVwLiBJZiBub3QsIHRyeSB0byBmZXRjaCBpdCBmcm9tIGNhY2hlLlxuICAgIGNvbnN0IGRlZmluaXRpb25Pck51bGw6IEljb25EZWZpbml0aW9uIHwgbnVsbCA9IGlzSWNvbkRlZmluaXRpb24oaWNvbilcbiAgICAgID8gKGljb24gYXMgSWNvbkRlZmluaXRpb24pXG4gICAgICA6IHRoaXMuX3N2Z0RlZmluaXRpb25zLmdldChpY29uKSB8fCBudWxsO1xuXG4gICAgLy8gSWYgYGljb25gIGlzIGEgYEljb25EZWZpbml0aW9uYCBvZiBzdWNjZXNzZnVsbHkgZmV0Y2gsIHdyYXAgaXQgaW4gYW4gYE9ic2VydmFibGVgLlxuICAgIC8vIE90aGVyd2lzZSB0cnkgdG8gZmV0Y2ggaXQgZnJvbSByZW1vdGUuXG4gICAgY29uc3QgJGljb25EZWZpbml0aW9uID0gZGVmaW5pdGlvbk9yTnVsbFxuICAgICAgPyByeG9mKGRlZmluaXRpb25Pck51bGwpXG4gICAgICA6IHRoaXMuX2xvYWRJY29uRHluYW1pY2FsbHkoaWNvbiBhcyBzdHJpbmcpO1xuXG4gICAgLy8gSWYgZmluYWxseSBnZXQgYW4gYEljb25EZWZpbml0aW9uYCwgcmVuZGVyIGFuZCByZXR1cm4gaXQuIE90aGVyd2lzZSB0aHJvdyBhbiBlcnJvci5cbiAgICByZXR1cm4gJGljb25EZWZpbml0aW9uLnBpcGUoXG4gICAgICBtYXAoaSA9PiB7XG4gICAgICAgIGlmICghaSkge1xuICAgICAgICAgIHRocm93IEljb25Ob3RGb3VuZEVycm9yKGljb24gYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFNWR0Zyb21DYWNoZU9yQ3JlYXRlTmV3KGksIHR3b1RvbmVDb2xvcik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDYWNoZWRJY29ucygpOiBNYXA8c3RyaW5nLCBJY29uRGVmaW5pdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLl9zdmdEZWZpbml0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmF3IHN2ZyBhbmQgYXNzZW1ibGUgYSBgSWNvbkRlZmluaXRpb25gIG9iamVjdC5cbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfbG9hZEljb25EeW5hbWljYWxseShcbiAgICB0eXBlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxJY29uRGVmaW5pdGlvbiB8IG51bGw+IHtcbiAgICAvLyBJZiBkZXZlbG9wZXIgZG9lc24ndCBwcm92aWRlIEhUVFAgbW9kdWxlIG5vciBlbmFibGUganNvbnAgbG9hZGluZywganVzdCB0aHJvdyBhbiBlcnJvci5cbiAgICBpZiAoIXRoaXMuX2h0dHAgJiYgIXRoaXMuX2VuYWJsZUpzb25wTG9hZGluZykge1xuICAgICAgcmV0dXJuIHJ4b2YoSHR0cE1vZHVsZU5vdEltcG9ydCgpKTtcbiAgICB9XG5cbiAgICAvLyBJZiBtdWx0aSBkaXJlY3RpdmUgYXNrIGZvciB0aGUgc2FtZSBpY29uIGF0IHRoZSBzYW1lIHRpbWUsXG4gICAgLy8gcmVxdWVzdCBzaG91bGQgb25seSBiZSBmaXJlZCBvbmNlLlxuICAgIGxldCBpblByb2dyZXNzID0gdGhpcy5faW5Qcm9ncmVzc0ZldGNoZXMuZ2V0KHR5cGUpO1xuXG4gICAgaWYgKCFpblByb2dyZXNzKSB7XG4gICAgICBjb25zdCBbbmFtZSwgbmFtZXNwYWNlXSA9IGdldE5hbWVBbmROYW1lc3BhY2UodHlwZSk7XG5cbiAgICAgIC8vIElmIHRoZSBzdHJpbmcgaGFzIGEgbmFtZXNwYWNlIHdpdGhpbiwgY3JlYXRlIGEgc2ltcGxlIGBJY29uRGVmaW5pdGlvbmAuXG4gICAgICBjb25zdCBpY29uOiBJY29uRGVmaW5pdGlvbiA9IG5hbWVzcGFjZVxuICAgICAgICA/IHsgbmFtZTogdHlwZSwgaWNvbjogJycgfVxuICAgICAgICA6IGdldEljb25EZWZpbml0aW9uRnJvbUFiYnIobmFtZSk7XG5cbiAgICAgIGNvbnN0IHN1ZmZpeCA9IHRoaXMuX2VuYWJsZUpzb25wTG9hZGluZyA/ICcuanMnIDogJy5zdmcnO1xuICAgICAgY29uc3QgdXJsID1cbiAgICAgICAgKG5hbWVzcGFjZVxuICAgICAgICAgID8gYCR7dGhpcy5fYXNzZXRzVXJsUm9vdH1hc3NldHMvJHtuYW1lc3BhY2V9LyR7bmFtZX1gXG4gICAgICAgICAgOiBgJHt0aGlzLl9hc3NldHNVcmxSb290fWFzc2V0cy8ke2ljb24udGhlbWV9LyR7aWNvbi5uYW1lfWApICsgc3VmZml4O1xuXG4gICAgICBjb25zdCBzYWZlVXJsID0gdGhpcy5zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LlVSTCwgdXJsKTtcblxuICAgICAgaWYgKCFzYWZlVXJsKSB7XG4gICAgICAgIHRocm93IFVybE5vdFNhZmVFcnJvcih1cmwpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2UgPSAhdGhpcy5fZW5hYmxlSnNvbnBMb2FkaW5nXG4gICAgICAgID8gdGhpcy5faHR0cFxuICAgICAgICAgICAgLmdldChzYWZlVXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gICAgICAgICAgICAucGlwZShtYXAobGl0ZXJhbCA9PiAoeyAuLi5pY29uLCBpY29uOiBsaXRlcmFsIH0pKSlcbiAgICAgICAgOiB0aGlzLl9sb2FkSWNvbkR5bmFtaWNhbGx5V2l0aEpzb25wKGljb24sIHNhZmVVcmwpO1xuXG4gICAgICBpblByb2dyZXNzID0gc291cmNlLnBpcGUoXG4gICAgICAgIHRhcChkZWZpbml0aW9uID0+IHRoaXMuYWRkSWNvbihkZWZpbml0aW9uKSksXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuX2luUHJvZ3Jlc3NGZXRjaGVzLmRlbGV0ZSh0eXBlKSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gcnhvZihudWxsKSksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2luUHJvZ3Jlc3NGZXRjaGVzLnNldCh0eXBlLCBpblByb2dyZXNzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5Qcm9ncmVzcztcbiAgfVxuXG4gIHByb3RlY3RlZCBfbG9hZEljb25EeW5hbWljYWxseVdpdGhKc29ucChpY29uOiBJY29uRGVmaW5pdGlvbiwgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEljb25EZWZpbml0aW9uPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEljb25EZWZpbml0aW9uPihzdWJzY3JpYmVyID0+IHtcbiAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYW4oKTtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihEeW5hbWljTG9hZGluZ1RpbWVvdXRFcnJvcigpKTtcbiAgICAgIH0sIDYwMDApO1xuXG4gICAgICBsb2FkZXIuc3JjID0gdXJsO1xuXG4gICAgICBmdW5jdGlvbiBjbGVhbigpOiB2b2lkIHtcbiAgICAgICAgbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGVyKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXIpO1xuICAgICAgdGhpcy5fanNvbnBJY29uTG9hZCRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKGkgPT4gaS5uYW1lID09PSBpY29uLm5hbWUgJiYgaS50aGVtZSA9PT0gaWNvbi50aGVtZSksXG4gICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZShpID0+IHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpKTtcbiAgICAgICAgICAgIGNsZWFuKCk7XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGEgbmV3IGBTVkdFbGVtZW50YCBmb3IgYSBnaXZlbiBgSWNvbkRlZmluaXRpb25gLCBvciBtYWtlIGEgY29weSBmcm9tIGNhY2hlLlxuICAgKiBAcGFyYW0gaWNvblxuICAgKiBAcGFyYW0gdHdvVG9uZUNvbG9yXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xvYWRTVkdGcm9tQ2FjaGVPckNyZWF0ZU5ldyhcbiAgICBpY29uOiBJY29uRGVmaW5pdGlvbixcbiAgICB0d29Ub25lQ29sb3I/OiBzdHJpbmdcbiAgKTogU1ZHRWxlbWVudCB7XG4gICAgbGV0IHN2ZzogU1ZHRWxlbWVudDtcblxuICAgIGNvbnN0IHByaSA9IHR3b1RvbmVDb2xvciB8fCB0aGlzLl90d29Ub25lQ29sb3JQYWxldHRlLnByaW1hcnlDb2xvcjtcbiAgICBjb25zdCBzZWMgPVxuICAgICAgZ2V0U2Vjb25kYXJ5Q29sb3IocHJpKSB8fCB0aGlzLl90d29Ub25lQ29sb3JQYWxldHRlLnNlY29uZGFyeUNvbG9yO1xuICAgIGNvbnN0IGtleSA9XG4gICAgICBpY29uLnRoZW1lID09PSAndHdvdG9uZSdcbiAgICAgICAgPyB3aXRoU3VmZml4QW5kQ29sb3IoaWNvbi5uYW1lLCBpY29uLnRoZW1lLCBwcmksIHNlYylcbiAgICAgICAgOiBpY29uLnRoZW1lID09PSB1bmRlZmluZWRcbiAgICAgICAgPyBpY29uLm5hbWVcbiAgICAgICAgOiB3aXRoU3VmZml4KGljb24ubmFtZSwgaWNvbi50aGVtZSk7XG5cbiAgICAvLyBUcnkgdG8gbWFrZSBhIGNvcHkgZnJvbSBjYWNoZS5cbiAgICBjb25zdCBjYWNoZWQgPSB0aGlzLl9zdmdSZW5kZXJlZERlZmluaXRpb25zLmdldChrZXkpO1xuXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgc3ZnID0gY2FjaGVkLmljb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHN2ZyA9IHRoaXMuX3NldFNWR0F0dHJpYnV0ZShcbiAgICAgICAgdGhpcy5fY29sb3JpemVTVkdJY29uKFxuICAgICAgICAgIC8vIEljb25zIHByb3ZpZGVkIGJ5IGFudCBkZXNpZ24gc2hvdWxkIGJlIHJlZmluZWQgdG8gcmVtb3ZlIHByZXNldCBjb2xvcnMuXG4gICAgICAgICAgdGhpcy5fY3JlYXRlU1ZHRWxlbWVudEZyb21TdHJpbmcoXG4gICAgICAgICAgICBoYXNOYW1lc3BhY2UoaWNvbi5uYW1lKSA/IGljb24uaWNvbiA6IHJlcGxhY2VGaWxsQ29sb3IoaWNvbi5pY29uKVxuICAgICAgICAgICksXG4gICAgICAgICAgaWNvbi50aGVtZSA9PT0gJ3R3b3RvbmUnLFxuICAgICAgICAgIHByaSxcbiAgICAgICAgICBzZWNcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIC8vIENhY2hlIGl0LlxuICAgICAgdGhpcy5fc3ZnUmVuZGVyZWREZWZpbml0aW9ucy5zZXQoa2V5LCB7XG4gICAgICAgIC4uLmljb24sXG4gICAgICAgIGljb246IHN2Z1xuICAgICAgfSBhcyBDYWNoZWRJY29uRGVmaW5pdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lU1ZHKHN2Zyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVNWR0VsZW1lbnRGcm9tU3RyaW5nKHN0cjogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG4gICAgY29uc3QgZGl2ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IHN0cjtcbiAgICBjb25zdCBzdmc6IFNWR0VsZW1lbnQgPSBkaXYucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHRocm93IFNWR1RhZ05vdEZvdW5kRXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBzdmc7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NldFNWR0F0dHJpYnV0ZShzdmc6IFNWR0VsZW1lbnQpOiBTVkdFbGVtZW50IHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnd2lkdGgnLCAnMWVtJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ2hlaWdodCcsICcxZW0nKTtcbiAgICByZXR1cm4gc3ZnO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb2xvcml6ZVNWR0ljb24oXG4gICAgc3ZnOiBTVkdFbGVtZW50LFxuICAgIHR3b3RvbmU6IGJvb2xlYW4sXG4gICAgcHJpOiBzdHJpbmcsXG4gICAgc2VjOiBzdHJpbmdcbiAgKTogU1ZHRWxlbWVudCB7XG4gICAgaWYgKHR3b3RvbmUpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gc3ZnLmNoaWxkTm9kZXM7XG4gICAgICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkOiBIVE1MRWxlbWVudCA9IGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdmaWxsJykgPT09ICdzZWNvbmRhcnlDb2xvcicpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoY2hpbGQsICdmaWxsJywgc2VjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoY2hpbGQsICdmaWxsJywgcHJpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnZmlsbCcsICdjdXJyZW50Q29sb3InKTtcbiAgICByZXR1cm4gc3ZnO1xuICB9XG59XG4iXX0=