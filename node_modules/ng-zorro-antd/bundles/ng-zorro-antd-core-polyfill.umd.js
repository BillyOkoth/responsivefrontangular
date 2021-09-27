(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/polyfill', ['exports'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core.polyfill = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: request-animation.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // tslint:disable: typedef no-invalid-this
    /** @type {?} */
    var availablePrefixes = ['moz', 'ms', 'webkit'];
    /**
     * @return {?}
     */
    function requestAnimationFramePolyfill() {
        /** @type {?} */
        var lastTime = 0;
        return (/**
         * @param {?} callback
         * @return {?}
         */
        function (callback) {
            /** @type {?} */
            var currTime = new Date().getTime();
            /** @type {?} */
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            /** @type {?} */
            var id = setTimeout((/**
             * @return {?}
             */
            function () {
                callback(currTime + timeToCall);
            }), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        });
    }
    /**
     * @return {?}
     */
    function getRequestAnimationFrame() {
        if (typeof window === 'undefined') {
            return (/**
             * @return {?}
             */
            function () { return 0; });
        }
        if (window.requestAnimationFrame) {
            // https://github.com/vuejs/vue/issues/4465
            return window.requestAnimationFrame.bind(window);
        }
        /** @type {?} */
        var prefix = availablePrefixes.filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key + "RequestAnimationFrame" in window; }))[0];
        return prefix ? ((/** @type {?} */ (window)))[prefix + "RequestAnimationFrame"] : requestAnimationFramePolyfill();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    function cancelRequestAnimationFrame(id) {
        if (typeof window === 'undefined') {
            return null;
        }
        if (window.cancelAnimationFrame) {
            return window.cancelAnimationFrame(id);
        }
        /** @type {?} */
        var prefix = availablePrefixes.filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key + "CancelAnimationFrame" in window || key + "CancelRequestAnimationFrame" in window; }))[0];
        return prefix
            ? (((/** @type {?} */ (window)))[prefix + "CancelAnimationFrame"] || ((/** @type {?} */ (window)))[prefix + "CancelRequestAnimationFrame"])
                // @ts-ignore
                .call(this, id)
            : clearTimeout(id);
    }
    /** @type {?} */
    var reqAnimFrame = getRequestAnimationFrame();

    exports.cancelRequestAnimationFrame = cancelRequestAnimationFrame;
    exports.reqAnimFrame = reqAnimFrame;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-polyfill.umd.js.map
