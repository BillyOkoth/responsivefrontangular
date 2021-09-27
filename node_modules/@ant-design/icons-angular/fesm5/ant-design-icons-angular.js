import { __assign, __read, __decorate, __param } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import { isDevMode, SecurityContext, RendererFactory2, Optional, Inject, Injectable, ElementRef, Renderer2, Input, Directive, NgModule } from '@angular/core';
import { generate } from '@ant-design/colors';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, of, Observable } from 'rxjs';
import { map, tap, finalize, catchError, share, filter, take } from 'rxjs/operators';

var ANT_ICON_ANGULAR_CONSOLE_PREFIX = '[@ant-design/icons-angular]:';
function error(message) {
    console.error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + " " + message + ".");
}
function warn(message) {
    if (isDevMode()) {
        console.warn(ANT_ICON_ANGULAR_CONSOLE_PREFIX + " " + message + ".");
    }
}
function getSecondaryColor(primaryColor) {
    return generate(primaryColor)[0];
}
function withSuffix(name, theme) {
    switch (theme) {
        case 'fill': return name + "-fill";
        case 'outline': return name + "-o";
        case 'twotone': return name + "-twotone";
        case undefined: return name;
        default: throw new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Theme \"" + theme + "\" is not a recognized theme!");
    }
}
function withSuffixAndColor(name, theme, pri, sec) {
    return withSuffix(name, theme) + "-" + pri + "-" + sec;
}
function mapAbbrToTheme(abbr) {
    return abbr === 'o' ? 'outline' : abbr;
}
function alreadyHasAThemeSuffix(name) {
    return name.endsWith('-fill') || name.endsWith('-o') || name.endsWith('-twotone');
}
function isIconDefinition(target) {
    return (typeof target === 'object' &&
        typeof target.name === 'string' &&
        (typeof target.theme === 'string' || target.theme === undefined) &&
        typeof target.icon === 'string');
}
/**
 * Get an `IconDefinition` object from abbreviation type, like `account-book-fill`.
 * @param str
 */
function getIconDefinitionFromAbbr(str) {
    var arr = str.split('-');
    var theme = mapAbbrToTheme(arr.splice(arr.length - 1, 1)[0]);
    var name = arr.join('-');
    return {
        name: name,
        theme: theme,
        icon: ''
    };
}
function cloneSVG(svg) {
    return svg.cloneNode(true);
}
/**
 * Parse inline SVG string and replace colors with placeholders. For twotone icons only.
 */
function replaceFillColor(raw) {
    return raw
        .replace(/['"]#333['"]/g, '"primaryColor"')
        .replace(/['"]#E6E6E6['"]/g, '"secondaryColor"')
        .replace(/['"]#D9D9D9['"]/g, '"secondaryColor"')
        .replace(/['"]#D8D8D8['"]/g, '"secondaryColor"');
}
/**
 * Split a name with namespace in it into a tuple like [ name, namespace ].
 */
function getNameAndNamespace(type) {
    var split = type.split(':');
    switch (split.length) {
        case 1: return [type, ''];
        case 2: return [split[1], split[0]];
        default: throw new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "The icon type " + type + " is not valid!");
    }
}
function hasNamespace(type) {
    return getNameAndNamespace(type)[1] !== '';
}

function NameSpaceIsNotSpecifyError() {
    return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Type should have a namespace. Try \"namespace:" + name + "\".");
}
function IconNotFoundError(icon) {
    return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "the icon " + icon + " does not exist or is not registered.");
}
function HttpModuleNotImport() {
    error("you need to import \"HttpClientModule\" to use dynamic importing.");
    return null;
}
function UrlNotSafeError(url) {
    return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "The url \"" + url + "\" is unsafe.");
}
function SVGTagNotFoundError() {
    return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "<svg> tag not found.");
}
function DynamicLoadingTimeoutError() {
    return new Error(ANT_ICON_ANGULAR_CONSOLE_PREFIX + "Importing timeout error.");
}

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
            ? of(definitionOrNull)
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
            return of(HttpModuleNotImport());
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
            inProgress = source.pipe(tap(function (definition) { return _this.addIcon(definition); }), finalize(function () { return _this._inProgressFetches.delete(type); }), catchError(function () { return of(null); }), share());
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

var IconDirective = /** @class */ (function () {
    function IconDirective(_iconService, _elementRef, _renderer) {
        this._iconService = _iconService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    IconDirective.prototype.ngOnChanges = function (changes) {
        if (changes.type || changes.theme || changes.twoToneColor) {
            this._changeIcon();
        }
    };
    /**
     * Render a new icon in the current element. Remove the icon when `type` is falsy.
     */
    IconDirective.prototype._changeIcon = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.type) {
                _this._clearSVGElement();
                resolve(null);
            }
            else {
                _this._iconService.getRenderedContent(_this._parseIconType(_this.type, _this.theme), _this.twoToneColor).subscribe(function (svg) {
                    _this._setSVGElement(svg);
                    resolve(svg);
                });
            }
        });
    };
    /**
     * Parse a icon to the standard form, an `IconDefinition` or a string like 'account-book-fill` (with a theme suffixed).
     * If namespace is specified, ignore theme because it meaningless for users' icons.
     * @param type
     * @param theme
     */
    IconDirective.prototype._parseIconType = function (type, theme) {
        if (isIconDefinition(type)) {
            return type;
        }
        else {
            var _a = __read(getNameAndNamespace(type), 2), name_1 = _a[0], namespace = _a[1];
            if (namespace) {
                return type;
            }
            if (alreadyHasAThemeSuffix(name_1)) {
                if (!!theme) {
                    warn("'type' " + name_1 + " already gets a theme inside so 'theme' " + theme + " would be ignored");
                }
                return name_1;
            }
            else {
                return withSuffix(name_1, theme || this._iconService.defaultTheme);
            }
        }
    };
    IconDirective.prototype._setSVGElement = function (svg) {
        this._clearSVGElement();
        this._renderer.appendChild(this._elementRef.nativeElement, svg);
    };
    IconDirective.prototype._clearSVGElement = function () {
        var el = this._elementRef.nativeElement;
        var children = el.childNodes;
        var length = children.length;
        for (var i = length - 1; i >= 0; i--) {
            var child = children[i];
            if (child.tagName.toLowerCase() === 'svg') {
                this._renderer.removeChild(el, child);
            }
        }
    };
    IconDirective.ctorParameters = function () { return [
        { type: IconService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], IconDirective.prototype, "type", void 0);
    __decorate([
        Input()
    ], IconDirective.prototype, "theme", void 0);
    __decorate([
        Input()
    ], IconDirective.prototype, "twoToneColor", void 0);
    IconDirective = __decorate([
        Directive({
            selector: '[antIcon]'
        })
    ], IconDirective);
    return IconDirective;
}());

var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [IconDirective],
            declarations: [IconDirective],
            providers: [IconService]
        })
    ], IconModule);
    return IconModule;
}());

var manifest = {
    fill: [
        'alert', 'account-book', 'alipay-circle', 'alipay-square', 'amazon-circle', 'aliwangwang', 'amazon-square', 'android', 'api', 'apple', 'appstore', 'audio', 'backward', 'bank', 'behance-circle', 'book', 'box-plot', 'bell', 'behance-square', 'build', 'bug', 'bulb', 'calculator', 'camera', 'calendar', 'car', 'caret-left', 'caret-down', 'caret-up', 'caret-right', 'carry-out', 'check-circle', 'chrome', 'clock-circle', 'check-square', 'close-circle', 'ci-circle', 'code-sandbox-circle', 'close-square', 'cloud', 'code-sandbox-square', 'codepen-circle', 'code', 'contacts', 'compass', 'codepen-square', 'control', 'container', 'copy', 'credit-card', 'customer-service', 'copyright-circle', 'database', 'crown', 'dashboard', 'diff', 'delete', 'dingtalk-circle', 'dingtalk-square', 'dislike', 'dollar-circle', 'down-square', 'down-circle', 'dribbble-circle', 'dribbble-square', 'dropbox-circle', 'edit', 'dropbox-square', 'euro-circle', 'exclamation-circle', 'environment', 'eye-invisible', 'experiment', 'facebook', 'eye', 'fast-backward', 'fast-forward', 'file-excel', 'file-add', 'file-exclamation', 'file-pdf', 'file-image', 'file-markdown', 'file-ppt', 'file-text', 'file-unknown', 'file', 'file-zip', 'file-word', 'filter', 'fire', 'flag', 'folder-add', 'format-painter', 'folder', 'folder-open', 'forward', 'fund', 'frown', 'funnel-plot', 'github', 'gitlab', 'gift', 'gold', 'golden', 'google-circle', 'google-plus-circle', 'google-plus-square', 'google-square', 'hdd', 'heart', 'highlight', 'home', 'hourglass', 'html5', 'idcard', 'ie-circle', 'info-circle', 'ie-square', 'instagram', 'insurance', 'layout', 'interaction', 'linkedin', 'left-circle', 'left-square', 'like', 'lock', 'mac-command', 'mail', 'medicine-box', 'medium-circle', 'meh', 'message', 'medium-square', 'minus-circle', 'mobile', 'money-collect', 'minus-square', 'notification', 'pause-circle', 'pay-circle', 'phone', 'picture', 'pie-chart', 'plus-circle', 'play-circle', 'play-square', 'plus-square', 'pound-circle', 'printer', 'project', 'property-safety', 'profile', 'pushpin', 'qq-circle', 'qq-square', 'question-circle', 'read', 'red-envelope', 'reddit-circle', 'reconciliation', 'reddit-square', 'right-circle', 'right-square', 'robot', 'rest', 'safety-certificate', 'rocket', 'save', 'security-scan', 'schedule', 'sketch-circle', 'signal', 'setting', 'shop', 'shopping', 'skin', 'sketch-square', 'slack-circle', 'skype', 'smile', 'slack-square', 'sliders', 'sound', 'snippets', 'star', 'step-forward', 'stop', 'tag', 'step-backward', 'switcher', 'tablet', 'tags', 'thunderbolt', 'taobao-square', 'trademark-circle', 'taobao-circle', 'tool', 'twitter-circle', 'trophy', 'twitter-square', 'up-square', 'up-circle', 'warning', 'usb', 'unlock', 'wechat', 'video-camera', 'weibo-circle', 'windows', 'wallet', 'weibo-square', 'yuque', 'youtube', 'zhihu-square', 'yahoo', 'zhihu-circle'
    ],
    outline: [
        'alert', 'account-book', 'aim', 'align-center', 'align-right', 'align-left', 'alibaba', 'alipay-circle', 'alipay', 'aliwangwang', 'aliyun', 'ant-design', 'android', 'apartment', 'ant-cloud', 'amazon', 'api', 'appstore-add', 'appstore', 'apple', 'area-chart', 'arrow-right', 'arrow-down', 'arrow-up', 'arrow-left', 'arrows-alt', 'audio-muted', 'audio', 'backward', 'audit', 'bank', 'barcode', 'bars', 'bar-chart', 'behance', 'behance-square', 'bg-colors', 'bell', 'block', 'bold', 'book', 'border-bottom', 'border-horizontal', 'border-left', 'border-outer', 'border-inner', 'border-right', 'border-top', 'border-verticle', 'border', 'box-plot', 'borderless-table', 'bug', 'branches', 'build', 'bulb', 'calculator', 'calendar', 'camera', 'caret-down', 'car', 'caret-left', 'caret-right', 'caret-up', 'carry-out', 'check-circle', 'check', 'check-square', 'ci-circle', 'ci', 'chrome', 'clock-circle', 'clear', 'close-circle', 'close-square', 'close', 'cloud-server', 'cloud-sync', 'cloud-upload', 'cloud-download', 'cluster', 'cloud', 'code-sandbox', 'code', 'codepen-circle', 'codepen', 'column-height', 'coffee', 'comment', 'compass', 'column-width', 'compress', 'console-sql', 'contacts', 'container', 'control', 'copy', 'copyright-circle', 'copyright', 'credit-card', 'dash', 'customer-service', 'crown', 'dashboard', 'database', 'delete-column', 'delete-row', 'delete', 'deployment-unit', 'desktop', 'delivered-procedure', 'dingtalk', 'diff', 'dingding', 'disconnect', 'dislike', 'dollar-circle', 'dollar', 'dot-chart', 'double-left', 'double-right', 'down-square', 'down', 'down-circle', 'download', 'dribbble', 'drag', 'dribbble-square', 'dropbox', 'edit', 'ellipsis', 'enter', 'euro-circle', 'environment', 'euro', 'exclamation-circle', 'expand-alt', 'exclamation', 'exception', 'expand', 'experiment', 'export', 'eye-invisible', 'eye', 'facebook', 'fast-backward', 'fall', 'fast-forward', 'field-binary', 'field-time', 'field-number', 'field-string', 'file-add', 'file-done', 'file-excel', 'file-exclamation', 'file-gif', 'file-image', 'file-jpg', 'file-ppt', 'file-markdown', 'file-pdf', 'file-protect', 'file-search', 'file-text', 'file-sync', 'file-unknown', 'file-word', 'file-zip', 'filter', 'fire', 'file', 'folder-add', 'folder-open', 'flag', 'font-colors', 'folder', 'font-size', 'folder-view', 'forward', 'fork', 'form', 'format-painter', 'fullscreen-exit', 'fund-projection-screen', 'frown', 'fullscreen', 'fund-view', 'function', 'fund', 'funnel-plot', 'gif', 'gateway', 'github', 'gift', 'gold', 'google-plus', 'google', 'gitlab', 'global', 'hdd', 'heat-map', 'group', 'highlight', 'heart', 'history', 'home', 'ie', 'hourglass', 'idcard', 'import', 'inbox', 'html5', 'info', 'info-circle', 'insert-row-right', 'insert-row-above', 'issues-close', 'instagram', 'insert-row-below', 'left-square', 'layout', 'insurance', 'key', 'laptop', 'insert-row-left', 'left', 'italic', 'left-circle', 'line-height', 'like', 'interaction', 'linkedin', 'loading', 'link', 'loading-3-quarters', 'login', 'line-chart', 'line', 'lock', 'medium-workmark', 'logout', 'mail', 'mac-command', 'man', 'medicine-box', 'menu-unfold', 'medium', 'menu-fold', 'menu', 'meh', 'minus-circle', 'minus', 'message', 'minus-square', 'merge-cells', 'more', 'node-collapse', 'node-index', 'mobile', 'one-to-one', 'node-expand', 'notification', 'money-collect', 'number', 'monitor', 'pause', 'pause-circle', 'pay-circle', 'ordered-list', 'partition', 'percentage', 'paper-clip', 'phone', 'pic-center', 'pic-left', 'play-circle', 'picture', 'pic-right', 'plus-circle', 'play-square', 'pie-chart', 'pound-circle', 'printer', 'pound', 'plus', 'project', 'poweroff', 'profile', 'pull-request', 'qrcode', 'plus-square', 'radius-bottomright', 'pushpin', 'radius-setting', 'radar-chart', 'qq', 'property-safety', 'radius-upleft', 'question-circle', 'reconciliation', 'radius-bottomleft', 'read', 'redo', 'question', 'radius-upright', 'rest', 'red-envelope', 'right', 'reload', 'reddit', 'retweet', 'right-square', 'rise', 'robot', 'right-circle', 'rollback', 'safety-certificate', 'rocket', 'safety', 'save', 'rotate-right', 'rotate-left', 'scan', 'schedule', 'search', 'share-alt', 'scissor', 'select', 'security-scan', 'shop', 'shrink', 'send', 'shake', 'setting', 'skin', 'shopping', 'sisternode', 'slack-square', 'shopping-cart', 'smile', 'skype', 'small-dash', 'slack', 'sketch', 'sliders', 'solution', 'sort-descending', 'step-backward', 'snippets', 'star', 'split-cells', 'step-forward', 'sort-ascending', 'stock', 'sound', 'stop', 'subnode', 'swap-left', 'table', 'strikethrough', 'swap', 'switcher', 'tablet', 'tags', 'swap-right', 'taobao', 'taobao-circle', 'team', 'sync', 'tool', 'tag', 'to-top', 'trademark', 'trademark-circle', 'twitter', 'thunderbolt', 'trophy', 'translation', 'transaction', 'undo', 'unordered-list', 'unlock', 'underline', 'up-circle', 'upload', 'up-square', 'up', 'user-switch', 'user-delete', 'ungroup', 'verified', 'user', 'usb', 'usergroup-delete', 'usergroup-add', 'vertical-left', 'user-add', 'vertical-align-middle', 'vertical-align-top', 'video-camera-add', 'vertical-align-bottom', 'wallet', 'vertical-right', 'video-camera', 'weibo-circle', 'wechat', 'warning', 'weibo', 'weibo-square', 'woman', 'whats-app', 'windows', 'yuque', 'yahoo', 'youtube', 'zoom-out', 'wifi', 'zoom-in', 'zhihu'
    ],
    twotone: [
        'account-book', 'api', 'alert', 'appstore', 'bank', 'bell', 'audio', 'book', 'build', 'box-plot', 'bulb', 'bug', 'calculator', 'calendar', 'carry-out', 'check-circle', 'check-square', 'camera', 'car', 'ci-circle', 'ci', 'clock-circle', 'close-circle', 'code', 'close-square', 'cloud', 'contacts', 'container', 'compass', 'copy', 'control', 'copyright', 'copyright-circle', 'credit-card', 'crown', 'customer-service', 'dashboard', 'database', 'delete', 'diff', 'dollar-circle', 'dislike', 'dollar', 'down-circle', 'edit', 'environment', 'euro', 'down-square', 'euro-circle', 'experiment', 'eye-invisible', 'exclamation-circle', 'eye', 'file-add', 'file-excel', 'file-exclamation', 'file-ppt', 'file-image', 'file-markdown', 'file-pdf', 'file-text', 'file-unknown', 'file-zip', 'file-word', 'filter', 'file', 'fire', 'flag', 'folder-add', 'fund', 'folder-open', 'folder', 'frown', 'gift', 'gold', 'funnel-plot', 'hdd', 'heart', 'home', 'highlight', 'html5', 'hourglass', 'idcard', 'info-circle', 'interaction', 'layout', 'insurance', 'like', 'left-circle', 'left-square', 'mail', 'lock', 'medicine-box', 'meh', 'minus-circle', 'message', 'money-collect', 'minus-square', 'mobile', 'notification', 'pause-circle', 'phone', 'pie-chart', 'picture', 'play-circle', 'play-square', 'plus-circle', 'printer', 'pound-circle', 'plus-square', 'profile', 'project', 'property-safety', 'reconciliation', 'red-envelope', 'pushpin', 'rest', 'question-circle', 'right-circle', 'right-square', 'safety-certificate', 'save', 'rocket', 'schedule', 'setting', 'security-scan', 'shop', 'shopping', 'sliders', 'skin', 'smile', 'snippets', 'sound', 'star', 'tablet', 'stop', 'switcher', 'tag', 'tags', 'trademark-circle', 'unlock', 'tool', 'thunderbolt', 'trophy', 'up-circle', 'up-square', 'usb', 'warning', 'video-camera', 'wallet'
    ]
};

/**
 * Generated bundle index. Do not edit.
 */

export { ANT_ICON_ANGULAR_CONSOLE_PREFIX, DynamicLoadingTimeoutError, HttpModuleNotImport, IconDirective, IconModule, IconNotFoundError, IconService, NameSpaceIsNotSpecifyError, SVGTagNotFoundError, UrlNotSafeError, alreadyHasAThemeSuffix, cloneSVG, error, getIconDefinitionFromAbbr, getNameAndNamespace, getSecondaryColor, hasNamespace, isIconDefinition, manifest, mapAbbrToTheme, replaceFillColor, warn, withSuffix, withSuffixAndColor };
//# sourceMappingURL=ant-design-icons-angular.js.map
