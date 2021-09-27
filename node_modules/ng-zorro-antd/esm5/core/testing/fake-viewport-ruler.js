/**
 * @fileoverview added by tsickle
 * Generated from: fake-viewport-ruler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @record
 */
function FakeViewportRect() { }
if (false) {
    /** @type {?} */
    FakeViewportRect.prototype.left;
    /** @type {?} */
    FakeViewportRect.prototype.top;
    /** @type {?} */
    FakeViewportRect.prototype.width;
    /** @type {?} */
    FakeViewportRect.prototype.height;
    /** @type {?} */
    FakeViewportRect.prototype.bottom;
    /** @type {?} */
    FakeViewportRect.prototype.right;
}
/**
 * @record
 */
function FakeViewportSize() { }
if (false) {
    /** @type {?} */
    FakeViewportSize.prototype.width;
    /** @type {?} */
    FakeViewportSize.prototype.height;
}
/**
 * @record
 */
function FakeViewportScrollPosition() { }
if (false) {
    /** @type {?} */
    FakeViewportScrollPosition.prototype.top;
    /** @type {?} */
    FakeViewportScrollPosition.prototype.left;
}
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
FakeViewportRuler = /** @class */ (function () {
    function FakeViewportRuler() {
    }
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportRect = /**
     * @return {?}
     */
    function () {
        return {
            left: 0,
            top: 0,
            width: 1014,
            height: 686,
            bottom: 686,
            right: 1014
        };
    };
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportSize = /**
     * @return {?}
     */
    function () {
        return { width: 1014, height: 686 };
    };
    /**
     * @return {?}
     */
    FakeViewportRuler.prototype.getViewportScrollPosition = /**
     * @return {?}
     */
    function () {
        return { top: 0, left: 0 };
    };
    return FakeViewportRuler;
}());
/**
 * \@docs-private
 */
export { FakeViewportRuler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS12aWV3cG9ydC1ydWxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvY29yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZmFrZS12aWV3cG9ydC1ydWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFRQSwrQkFPQzs7O0lBTkMsZ0NBQWE7O0lBQ2IsK0JBQVk7O0lBQ1osaUNBQWM7O0lBQ2Qsa0NBQWU7O0lBQ2Ysa0NBQWU7O0lBQ2YsaUNBQWM7Ozs7O0FBR2hCLCtCQUdDOzs7SUFGQyxpQ0FBYzs7SUFDZCxrQ0FBZTs7Ozs7QUFHakIseUNBR0M7OztJQUZDLHlDQUFZOztJQUNaLDBDQUFhOzs7OztBQUlmOzs7O0lBQUE7SUFtQkEsQ0FBQzs7OztJQWxCQywyQ0FBZTs7O0lBQWY7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCwyQ0FBZTs7O0lBQWY7UUFDRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELHFEQUF5Qjs7O0lBQXpCO1FBQ0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW50ZXJmYWNlIEZha2VWaWV3cG9ydFJlY3Qge1xuICBsZWZ0OiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgYm90dG9tOiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBGYWtlVmlld3BvcnRTaXplIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBGYWtlVmlld3BvcnRTY3JvbGxQb3NpdGlvbiB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgRmFrZVZpZXdwb3J0UnVsZXIge1xuICBnZXRWaWV3cG9ydFJlY3QoKTogRmFrZVZpZXdwb3J0UmVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgICB3aWR0aDogMTAxNCxcbiAgICAgIGhlaWdodDogNjg2LFxuICAgICAgYm90dG9tOiA2ODYsXG4gICAgICByaWdodDogMTAxNFxuICAgIH07XG4gIH1cblxuICBnZXRWaWV3cG9ydFNpemUoKTogRmFrZVZpZXdwb3J0U2l6ZSB7XG4gICAgcmV0dXJuIHsgd2lkdGg6IDEwMTQsIGhlaWdodDogNjg2IH07XG4gIH1cblxuICBnZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKCk6IEZha2VWaWV3cG9ydFNjcm9sbFBvc2l0aW9uIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgfVxufVxuIl19