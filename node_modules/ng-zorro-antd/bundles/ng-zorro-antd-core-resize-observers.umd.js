(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('resize-observer-polyfill'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/resize-observers', ['exports', '@angular/core', '@angular/cdk/coercion', 'resize-observer-polyfill', 'rxjs'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core['resize-observers'] = {}), global.ng.core, global.ng.cdk.coercion, global.ResizeObserver, global.rxjs));
}(this, (function (exports, core, coercion, ResizeObserver, rxjs) { 'use strict';

    ResizeObserver = ResizeObserver && Object.prototype.hasOwnProperty.call(ResizeObserver, 'default') ? ResizeObserver['default'] : ResizeObserver;

    /**
     * @fileoverview added by tsickle
     * Generated from: resize-observers.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
     */
    var NzResizeObserverFactory = /** @class */ (function () {
        function NzResizeObserverFactory() {
        }
        /**
         * @param {?} callback
         * @return {?}
         */
        NzResizeObserverFactory.prototype.create = /**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
        };
        NzResizeObserverFactory.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ NzResizeObserverFactory.ɵprov = core.ɵɵdefineInjectable({ factory: function NzResizeObserverFactory_Factory() { return new NzResizeObserverFactory(); }, token: NzResizeObserverFactory, providedIn: "root" });
        return NzResizeObserverFactory;
    }());
    /**
     * An injectable service that allows watching elements for changes to their content.
     */
    var NzResizeObserver = /** @class */ (function () {
        function NzResizeObserver(nzResizeObserverFactory) {
            this.nzResizeObserverFactory = nzResizeObserverFactory;
            /**
             * Keeps track of the existing ResizeObservers so they can be reused.
             */
            this.observedElements = new Map();
        }
        /**
         * @return {?}
         */
        NzResizeObserver.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.observedElements.forEach((/**
             * @param {?} _
             * @param {?} element
             * @return {?}
             */
            function (_, element) { return _this.cleanupObserver(element); }));
        };
        /**
         * @param {?} elementOrRef
         * @return {?}
         */
        NzResizeObserver.prototype.observe = /**
         * @param {?} elementOrRef
         * @return {?}
         */
        function (elementOrRef) {
            var _this = this;
            /** @type {?} */
            var element = coercion.coerceElement(elementOrRef);
            return new rxjs.Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var stream = _this.observeElement(element);
                /** @type {?} */
                var subscription = stream.subscribe(observer);
                return (/**
                 * @return {?}
                 */
                function () {
                    subscription.unsubscribe();
                    _this.unobserveElement(element);
                });
            }));
        };
        /**
         * Observes the given element by using the existing ResizeObserver if available, or creating a
         * new one if not.
         */
        /**
         * Observes the given element by using the existing ResizeObserver if available, or creating a
         * new one if not.
         * @private
         * @param {?} element
         * @return {?}
         */
        NzResizeObserver.prototype.observeElement = /**
         * Observes the given element by using the existing ResizeObserver if available, or creating a
         * new one if not.
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (!this.observedElements.has(element)) {
                /** @type {?} */
                var stream_1 = new rxjs.Subject();
                /** @type {?} */
                var observer = this.nzResizeObserverFactory.create((/**
                 * @param {?} mutations
                 * @return {?}
                 */
                function (mutations) { return stream_1.next(mutations); }));
                if (observer) {
                    observer.observe(element);
                }
                this.observedElements.set(element, { observer: observer, stream: stream_1, count: 1 });
            }
            else {
                (/** @type {?} */ (this.observedElements.get(element))).count++;
            }
            return (/** @type {?} */ (this.observedElements.get(element))).stream;
        };
        /**
         * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
         * observing this element.
         */
        /**
         * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
         * observing this element.
         * @private
         * @param {?} element
         * @return {?}
         */
        NzResizeObserver.prototype.unobserveElement = /**
         * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
         * observing this element.
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (this.observedElements.has(element)) {
                (/** @type {?} */ (this.observedElements.get(element))).count--;
                if (!(/** @type {?} */ (this.observedElements.get(element))).count) {
                    this.cleanupObserver(element);
                }
            }
        };
        /** Clean up the underlying ResizeObserver for the specified element. */
        /**
         * Clean up the underlying ResizeObserver for the specified element.
         * @private
         * @param {?} element
         * @return {?}
         */
        NzResizeObserver.prototype.cleanupObserver = /**
         * Clean up the underlying ResizeObserver for the specified element.
         * @private
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (this.observedElements.has(element)) {
                var _a = (/** @type {?} */ (this.observedElements.get(element))), observer = _a.observer, stream = _a.stream;
                if (observer) {
                    observer.disconnect();
                }
                stream.complete();
                this.observedElements.delete(element);
            }
        };
        NzResizeObserver.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        NzResizeObserver.ctorParameters = function () { return [
            { type: NzResizeObserverFactory }
        ]; };
        /** @nocollapse */ NzResizeObserver.ɵprov = core.ɵɵdefineInjectable({ factory: function NzResizeObserver_Factory() { return new NzResizeObserver(core.ɵɵinject(NzResizeObserverFactory)); }, token: NzResizeObserver, providedIn: "root" });
        return NzResizeObserver;
    }());
    if (false) {
        /**
         * Keeps track of the existing ResizeObservers so they can be reused.
         * @type {?}
         * @private
         */
        NzResizeObserver.prototype.observedElements;
        /**
         * @type {?}
         * @private
         */
        NzResizeObserver.prototype.nzResizeObserverFactory;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: resize-observers.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzResizeObserversModule = /** @class */ (function () {
        function NzResizeObserversModule() {
        }
        NzResizeObserversModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [NzResizeObserverFactory]
                    },] }
        ];
        return NzResizeObserversModule;
    }());

    exports.NzResizeObserver = NzResizeObserver;
    exports.NzResizeObserversModule = NzResizeObserversModule;
    exports.ɵa = NzResizeObserverFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-resize-observers.umd.js.map
