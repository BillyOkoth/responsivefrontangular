import { Injectable, NgZone, RendererFactory2, ɵɵdefineInjectable, ɵɵinject, Inject, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime, finalize, map, filter, startWith, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'ng-zorro-antd/core/environments';
import { getEventPosition, isTouchEvent } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { MediaMatcher } from '@angular/cdk/layout';

/**
 * @fileoverview added by tsickle
 * Generated from: resize.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NOOP = (/**
 * @return {?}
 */
() => { });
const ɵ0 = NOOP;
class NzResizeService {
    /**
     * @param {?} ngZone
     * @param {?} rendererFactory2
     */
    constructor(ngZone, rendererFactory2) {
        this.ngZone = ngZone;
        this.rendererFactory2 = rendererFactory2;
        this.resizeSource$ = new Subject();
        this.listeners = 0;
        this.disposeHandle = NOOP;
        this.handler = (/**
         * @return {?}
         */
        () => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.resizeSource$.next();
            }));
        });
        this.renderer = this.rendererFactory2.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    subscribe() {
        this.registerListener();
        return this.resizeSource$.pipe(auditTime(16), finalize((/**
         * @return {?}
         */
        () => this.unregisterListener())));
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        this.unregisterListener();
    }
    /**
     * @private
     * @return {?}
     */
    registerListener() {
        if (this.listeners === 0) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
            }));
        }
        this.listeners += 1;
    }
    /**
     * @private
     * @return {?}
     */
    unregisterListener() {
        this.listeners -= 1;
        if (this.listeners === 0) {
            this.disposeHandle();
            this.disposeHandle = NOOP;
        }
    }
}
NzResizeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzResizeService.ctorParameters = () => [
    { type: NgZone },
    { type: RendererFactory2 }
];
/** @nocollapse */ NzResizeService.ɵprov = ɵɵdefineInjectable({ factory: function NzResizeService_Factory() { return new NzResizeService(ɵɵinject(NgZone), ɵɵinject(RendererFactory2)); }, token: NzResizeService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.resizeSource$;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.listeners;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.disposeHandle;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.handler;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    NzResizeService.prototype.rendererFactory2;
}

/**
 * @fileoverview added by tsickle
 * Generated from: singleton.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function SingletonRegistryItem() { }
if (false) {
    /** @type {?} */
    SingletonRegistryItem.prototype.target;
}
/**
 * When running in test, singletons should not be destroyed. So we keep references of singletons
 * in this global variable.
 * @type {?}
 */
const testSingleRegistry = new Map();
/**
 * Some singletons should have life cycle that is same to Angular's. This service make sure that
 * those singletons get destroyed in HMR.
 */
class NzSingletonService {
    constructor() {
        /**
         * This registry is used to register singleton in dev mode.
         * So that singletons get destroyed when hot module reload happens.
         *
         * This works in prod mode too but with no specific effect.
         */
        this._singletonRegistry = new Map();
    }
    /**
     * @private
     * @return {?}
     */
    get singletonRegistry() {
        return environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
    }
    /**
     * @param {?} key
     * @param {?} target
     * @return {?}
     */
    registerSingletonWithKey(key, target) {
        /** @type {?} */
        const alreadyHave = this.singletonRegistry.has(key);
        /** @type {?} */
        const item = alreadyHave ? (/** @type {?} */ (this.singletonRegistry.get(key))) : this.withNewTarget(target);
        if (!alreadyHave) {
            this.singletonRegistry.set(key, item);
        }
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    getSingletonWithKey(key) {
        return this.singletonRegistry.has(key) ? ((/** @type {?} */ ((/** @type {?} */ (this.singletonRegistry.get(key))).target))) : null;
    }
    /**
     * @private
     * @param {?} target
     * @return {?}
     */
    withNewTarget(target) {
        return {
            target
        };
    }
}
NzSingletonService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ NzSingletonService.ɵprov = ɵɵdefineInjectable({ factory: function NzSingletonService_Factory() { return new NzSingletonService(); }, token: NzSingletonService, providedIn: "root" });
if (false) {
    /**
     * This registry is used to register singleton in dev mode.
     * So that singletons get destroyed when hot module reload happens.
     *
     * This works in prod mode too but with no specific effect.
     * @type {?}
     * @private
     */
    NzSingletonService.prototype._singletonRegistry;
}

/**
 * @fileoverview added by tsickle
 * Generated from: drag.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Point() { }
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
/**
 * @record
 */
function HandlerItem() { }
if (false) {
    /**
     * @param {?} e
     * @return {?}
     */
    HandlerItem.prototype.handler = function (e) { };
    /**
     * @return {?}
     */
    HandlerItem.prototype.teardown = function () { };
}
/**
 * @param {?} event
 * @return {?}
 */
function getPagePosition(event) {
    /** @type {?} */
    const e = getEventPosition(event);
    return {
        x: e.pageX,
        y: e.pageY
    };
}
/**
 * This module provide a global dragging service to other components.
 */
class NzDragService {
    /**
     * @param {?} rendererFactory2
     */
    constructor(rendererFactory2) {
        this.draggingThreshold = 5;
        this.currentDraggingSequence = null;
        this.currentStartingPoint = null;
        this.handleRegistry = new Set();
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    requestDraggingSequence(event) {
        if (!this.handleRegistry.size) {
            this.registerDraggingHandler(isTouchEvent(event));
        }
        // Complete last dragging sequence if a new target is dragged.
        if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
        }
        this.currentStartingPoint = getPagePosition(event);
        this.currentDraggingSequence = new Subject();
        return this.currentDraggingSequence.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            return {
                x: e.pageX - (/** @type {?} */ (this.currentStartingPoint)).x,
                y: e.pageY - (/** @type {?} */ (this.currentStartingPoint)).y
            };
        })), filter((/**
         * @param {?} e
         * @return {?}
         */
        (e) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold)), finalize((/**
         * @return {?}
         */
        () => this.teardownDraggingSequence())));
    }
    /**
     * @private
     * @param {?} isTouch
     * @return {?}
     */
    registerDraggingHandler(isTouch) {
        if (isTouch) {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchmove', (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
                    }
                }))
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchend', (/**
                 * @return {?}
                 */
                () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                }))
            });
        }
        else {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mousemove', (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e);
                    }
                }))
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mouseup', (/**
                 * @return {?}
                 */
                () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                }))
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    teardownDraggingSequence() {
        this.currentDraggingSequence = null;
    }
}
NzDragService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzDragService.ctorParameters = () => [
    { type: RendererFactory2 }
];
/** @nocollapse */ NzDragService.ɵprov = ɵɵdefineInjectable({ factory: function NzDragService_Factory() { return new NzDragService(ɵɵinject(RendererFactory2)); }, token: NzDragService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzDragService.prototype.draggingThreshold;
    /**
     * @type {?}
     * @private
     */
    NzDragService.prototype.currentDraggingSequence;
    /**
     * @type {?}
     * @private
     */
    NzDragService.prototype.currentStartingPoint;
    /**
     * @type {?}
     * @private
     */
    NzDragService.prototype.handleRegistry;
    /**
     * @type {?}
     * @private
     */
    NzDragService.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: scroll.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} t
 * @param {?} b
 * @param {?} c
 * @param {?} d
 * @return {?}
 */
function easeInOutCubic(t, b, c, d) {
    /** @type {?} */
    const cc = c - b;
    /** @type {?} */
    let tt = t / (d / 2);
    if (tt < 1) {
        return (cc / 2) * tt * tt * tt + b;
    }
    else {
        return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
    }
}
class NzScrollService {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        this.doc = doc;
    }
    /**
     * Set the position of the scroll bar of `el`.
     * @param {?} el
     * @param {?=} topValue
     * @return {?}
     */
    setScrollTop(el, topValue = 0) {
        if (el === window) {
            this.doc.body.scrollTop = topValue;
            (/** @type {?} */ (this.doc.documentElement)).scrollTop = topValue;
        }
        else {
            ((/** @type {?} */ (el))).scrollTop = topValue;
        }
    }
    /**
     * Get position of `el` against window.
     * @param {?} el
     * @return {?}
     */
    getOffset(el) {
        /** @type {?} */
        const ret = {
            top: 0,
            left: 0
        };
        if (!el || !el.getClientRects().length) {
            return ret;
        }
        /** @type {?} */
        const rect = el.getBoundingClientRect();
        if (rect.width || rect.height) {
            /** @type {?} */
            const doc = (/** @type {?} */ (el.ownerDocument)).documentElement;
            ret.top = rect.top - (/** @type {?} */ (doc)).clientTop;
            ret.left = rect.left - (/** @type {?} */ (doc)).clientLeft;
        }
        else {
            ret.top = rect.top;
            ret.left = rect.left;
        }
        return ret;
    }
    /**
     * Get the position of the scoll bar of `el`.
     * @param {?=} el
     * @param {?=} top
     * @return {?}
     */
    // TODO: remove '| Window' as the fallback already happens here
    getScroll(el, top = true) {
        /** @type {?} */
        const target = el ? el : window;
        /** @type {?} */
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        /** @type {?} */
        const method = top ? 'scrollTop' : 'scrollLeft';
        /** @type {?} */
        const isWindow = target === window;
        // @ts-ignore
        /** @type {?} */
        let ret = isWindow ? target[prop] : target[method];
        if (isWindow && typeof ret !== 'number') {
            ret = (/** @type {?} */ (this.doc.documentElement))[method];
        }
        return ret;
    }
    /**
     * Scroll `el` to some position with animation.
     *
     * @param {?} containerEl container, `window` by default
     * @param {?=} targetTopValue Scroll to `top`, 0 by default
     * @param {?=} easing Transition curve, `easeInOutCubic` by default
     * @param {?=} callback callback invoked when transition is done
     * @return {?}
     */
    scrollTo(containerEl, targetTopValue = 0, easing, callback) {
        /** @type {?} */
        const target = containerEl ? containerEl : window;
        /** @type {?} */
        const scrollTop = this.getScroll(target);
        /** @type {?} */
        const startTime = Date.now();
        /** @type {?} */
        const frameFunc = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const timestamp = Date.now();
            /** @type {?} */
            const time = timestamp - startTime;
            this.setScrollTop(target, (easing || easeInOutCubic)(time, scrollTop, targetTopValue, 450));
            if (time < 450) {
                reqAnimFrame(frameFunc);
            }
            else {
                if (callback) {
                    callback();
                }
            }
        });
        reqAnimFrame(frameFunc);
    }
}
NzScrollService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NzScrollService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzScrollService.prototype.doc;
}
/**
 * @param {?} doc
 * @param {?} scrollService
 * @return {?}
 */
function SCROLL_SERVICE_PROVIDER_FACTORY(doc, scrollService) {
    return scrollService || new NzScrollService(doc);
}
/** @type {?} */
const SCROLL_SERVICE_PROVIDER = {
    provide: NzScrollService,
    useFactory: SCROLL_SERVICE_PROVIDER_FACTORY,
    deps: [DOCUMENT, [new Optional(), new SkipSelf(), NzScrollService]]
};

/**
 * @fileoverview added by tsickle
 * Generated from: breakpoint.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const NzBreakpointEnum = {
    xxl: "xxl",
    xl: "xl",
    lg: "lg",
    md: "md",
    sm: "sm",
    xs: "xs",
};
/** @type {?} */
const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
/** @type {?} */
const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
class NzBreakpointService {
    /**
     * @param {?} resizeService
     * @param {?} mediaMatcher
     */
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.resizeService.subscribe().subscribe((/**
         * @return {?}
         */
        () => { }));
    }
    /**
     * @param {?} breakpointMap
     * @param {?=} fullMap
     * @return {?}
     */
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            /** @type {?} */
            const get = (/**
             * @return {?}
             */
            () => this.matchMedia(breakpointMap, true));
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((/**
             * @param {?} x
             * @param {?} y
             * @return {?}
             */
            (x, y) => x[0] === y[0])), map((/**
             * @param {?} x
             * @return {?}
             */
            x => x[1])));
        }
        else {
            /** @type {?} */
            const get = (/**
             * @return {?}
             */
            () => this.matchMedia(breakpointMap));
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    /**
     * @private
     * @param {?} breakpointMap
     * @param {?=} fullMap
     * @return {?}
     */
    matchMedia(breakpointMap, fullMap) {
        /** @type {?} */
        let bp = NzBreakpointEnum.md;
        /** @type {?} */
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map((/**
         * @param {?} breakpoint
         * @return {?}
         */
        breakpoint => {
            /** @type {?} */
            const castBP = (/** @type {?} */ (breakpoint));
            /** @type {?} */
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[(/** @type {?} */ (breakpoint))] = matched;
            if (matched) {
                bp = castBP;
            }
        }));
        if (fullMap) {
            return [bp, (/** @type {?} */ (breakpointBooleanMap))];
        }
        else {
            return bp;
        }
    }
}
NzBreakpointService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzBreakpointService.ctorParameters = () => [
    { type: NzResizeService },
    { type: MediaMatcher }
];
/** @nocollapse */ NzBreakpointService.ɵprov = ɵɵdefineInjectable({ factory: function NzBreakpointService_Factory() { return new NzBreakpointService(ɵɵinject(NzResizeService), ɵɵinject(MediaMatcher)); }, token: NzBreakpointService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzBreakpointService.prototype.resizeService;
    /**
     * @type {?}
     * @private
     */
    NzBreakpointService.prototype.mediaMatcher;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-services.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzBreakpointEnum, NzBreakpointService, NzDragService, NzResizeService, NzScrollService, NzSingletonService, SCROLL_SERVICE_PROVIDER, SCROLL_SERVICE_PROVIDER_FACTORY, gridResponsiveMap, siderResponsiveMap };
//# sourceMappingURL=ng-zorro-antd-core-services.js.map
