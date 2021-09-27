/**
 * @fileoverview added by tsickle
 * Generated from: event-objects.ts
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
 * Creates a browser MouseEvent with the specified options.
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} button
 * @return {?}
 */
export function createMouseEvent(type, x, y, button) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (button === void 0) { button = 0; }
    /** @type {?} */
    var event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true /* canBubble */, false /* cancelable */, window /* view */, 0 /* detail */, x /* screenX */, y /* screenY */, x /* clientX */, y /* clientY */, false /* ctrlKey */, false /* altKey */, false /* shiftKey */, false /* metaKey */, button /* button */, null /* relatedTarget */);
    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: (/**
         * @return {?}
         */
        function () { return 1; }) });
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @param {?} type
 * @param {?=} pageX
 * @param {?=} pageY
 * @return {?}
 */
export function createTouchEvent(type, pageX, pageY) {
    if (pageX === void 0) { pageX = 0; }
    if (pageY === void 0) { pageY = 0; }
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    /** @type {?} */
    var event = new UIEvent(type, { detail: 0, view: window });
    /** @type {?} */
    var touchDetails = { pageX: pageX, pageY: pageY, clientX: pageX, clientY: pageY };
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] },
        changedTouches: { value: [touchDetails] }
    });
    return event;
}
/**
 * Dispatches a keydown event from an element.
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @param {?=} key
 * @param {?=} ctrlKey
 * @param {?=} metaKey
 * @param {?=} shiftKey
 * @return {?}
 */
export function createKeyboardEvent(type, keyCode, target, key, ctrlKey, metaKey, shiftKey) {
    /** @type {?} */
    var event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
    /** @type {?} */
    var originalPreventDefault = event.preventDefault;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    }
    else {
        event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
    }
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: (/**
             * @return {?}
             */
            function () { return keyCode; }) },
        key: { get: (/**
             * @return {?}
             */
            function () { return key; }) },
        target: { get: (/**
             * @return {?}
             */
            function () { return target; }) },
        ctrlKey: { get: (/**
             * @return {?}
             */
            function () { return ctrlKey; }) },
        metaKey: { get: (/**
             * @return {?}
             */
            function () { return metaKey; }) },
        shiftKey: { get: (/**
             * @return {?}
             */
            function () { return shiftKey; }) }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    // tslint:disable-next-line:typedef
    event.preventDefault = (/**
     * @return {?}
     */
    function () {
        Object.defineProperty(event, 'defaultPrevented', { get: (/**
             * @return {?}
             */
            function () { return true; }), configurable: true });
        // tslint:disable-next-line:no-invalid-this
        return originalPreventDefault.apply(this, arguments);
    });
    return event;
}
/**
 * Creates a fake event object with any desired event type.
 * @param {?} type
 * @param {?=} canBubble
 * @param {?=} cancelable
 * @return {?}
 */
export function createFakeEvent(type, canBubble, cancelable) {
    if (canBubble === void 0) { canBubble = true; }
    if (cancelable === void 0) { cancelable = true; }
    /** @type {?} */
    var event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtb2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvY29yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZXZlbnQtb2JqZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsQ0FBYSxFQUFFLENBQWEsRUFBRSxNQUFrQjtJQUFoRCxrQkFBQSxFQUFBLEtBQWE7SUFBRSxrQkFBQSxFQUFBLEtBQWE7SUFBRSx1QkFBQSxFQUFBLFVBQWtCOztRQUN2RixLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7SUFFaEQsS0FBSyxDQUFDLGNBQWMsQ0FDbEIsSUFBSSxFQUNKLElBQUksQ0FBQyxlQUFlLEVBQ3BCLEtBQUssQ0FBQyxnQkFBZ0IsRUFDdEIsTUFBTSxDQUFDLFVBQVUsRUFDakIsQ0FBQyxDQUFDLFlBQVksRUFDZCxDQUFDLENBQUMsYUFBYSxFQUNmLENBQUMsQ0FBQyxhQUFhLEVBQ2YsQ0FBQyxDQUFDLGFBQWEsRUFDZixDQUFDLENBQUMsYUFBYSxFQUNmLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQ3BCLEtBQUssQ0FBQyxhQUFhLEVBQ25CLE1BQU0sQ0FBQyxZQUFZLEVBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztJQUVGLDhEQUE4RDtJQUM5RCxrREFBa0Q7SUFDbEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRzs7O1FBQUUsY0FBTSxPQUFBLENBQUMsRUFBRCxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7SUFFMUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7OztBQUdELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsS0FBaUIsRUFBRSxLQUFpQjtJQUFw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Ozs7OztBQUdELE1BQU0sVUFBVSxlQUFlLENBQUMsSUFBWSxFQUFFLFNBQXlCLEVBQUUsVUFBMEI7SUFBckQsMEJBQUEsRUFBQSxnQkFBeUI7SUFBRSwyQkFBQSxFQUFBLGlCQUEwQjs7UUFDM0YsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3QyxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuLyoqIENyZWF0ZXMgYSBicm93c2VyIE1vdXNlRXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW91c2VFdmVudCh0eXBlOiBzdHJpbmcsIHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIGJ1dHRvbjogbnVtYmVyID0gMCk6IE1vdXNlRXZlbnQge1xuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG5cbiAgZXZlbnQuaW5pdE1vdXNlRXZlbnQoXG4gICAgdHlwZSxcbiAgICB0cnVlIC8qIGNhbkJ1YmJsZSAqLyxcbiAgICBmYWxzZSAvKiBjYW5jZWxhYmxlICovLFxuICAgIHdpbmRvdyAvKiB2aWV3ICovLFxuICAgIDAgLyogZGV0YWlsICovLFxuICAgIHggLyogc2NyZWVuWCAqLyxcbiAgICB5IC8qIHNjcmVlblkgKi8sXG4gICAgeCAvKiBjbGllbnRYICovLFxuICAgIHkgLyogY2xpZW50WSAqLyxcbiAgICBmYWxzZSAvKiBjdHJsS2V5ICovLFxuICAgIGZhbHNlIC8qIGFsdEtleSAqLyxcbiAgICBmYWxzZSAvKiBzaGlmdEtleSAqLyxcbiAgICBmYWxzZSAvKiBtZXRhS2V5ICovLFxuICAgIGJ1dHRvbiAvKiBidXR0b24gKi8sXG4gICAgbnVsbCAvKiByZWxhdGVkVGFyZ2V0ICovXG4gICk7XG5cbiAgLy8gYGluaXRNb3VzZUV2ZW50YCBkb2Vzbid0IGFsbG93IHVzIHRvIHBhc3MgdGhlIGBidXR0b25zYCBhbmRcbiAgLy8gZGVmYXVsdHMgaXQgdG8gMCB3aGljaCBsb29rcyBsaWtlIGEgZmFrZSBldmVudC5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnYnV0dG9ucycsIHsgZ2V0OiAoKSA9PiAxIH0pO1xuXG4gIHJldHVybiBldmVudDtcbn1cblxuLyoqIENyZWF0ZXMgYSBicm93c2VyIFRvdWNoRXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG91Y2hFdmVudCh0eXBlOiBzdHJpbmcsIHBhZ2VYOiBudW1iZXIgPSAwLCBwYWdlWTogbnVtYmVyID0gMCk6IFVJRXZlbnQge1xuICAvLyBJbiBmYXZvciBvZiBjcmVhdGluZyBldmVudHMgdGhhdCB3b3JrIGZvciBtb3N0IG9mIHRoZSBicm93c2VycywgdGhlIGV2ZW50IGlzIGNyZWF0ZWRcbiAgLy8gYXMgYSBiYXNpYyBVSSBFdmVudC4gVGhlIG5lY2Vzc2FyeSBkZXRhaWxzIGZvciB0aGUgZXZlbnQgd2lsbCBiZSBzZXQgbWFudWFsbHkuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IFVJRXZlbnQodHlwZSwgeyBkZXRhaWw6IDAsIHZpZXc6IHdpbmRvdyB9KTtcbiAgY29uc3QgdG91Y2hEZXRhaWxzID0geyBwYWdlWCwgcGFnZVksIGNsaWVudFg6IHBhZ2VYLCBjbGllbnRZOiBwYWdlWSB9O1xuXG4gIC8vIE1vc3Qgb2YgdGhlIGJyb3dzZXJzIGRvbid0IGhhdmUgYSBcImluaXRUb3VjaEV2ZW50XCIgbWV0aG9kIHRoYXQgY2FuIGJlIHVzZWQgdG8gZGVmaW5lXG4gIC8vIHRoZSB0b3VjaCBkZXRhaWxzLlxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhldmVudCwge1xuICAgIHRvdWNoZXM6IHsgdmFsdWU6IFt0b3VjaERldGFpbHNdIH0sXG4gICAgdGFyZ2V0VG91Y2hlczogeyB2YWx1ZTogW3RvdWNoRGV0YWlsc10gfSxcbiAgICBjaGFuZ2VkVG91Y2hlczogeyB2YWx1ZTogW3RvdWNoRGV0YWlsc10gfVxuICB9KTtcblxuICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBEaXNwYXRjaGVzIGEga2V5ZG93biBldmVudCBmcm9tIGFuIGVsZW1lbnQuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlS2V5Ym9hcmRFdmVudChcbiAgdHlwZTogc3RyaW5nLFxuICBrZXlDb2RlOiBudW1iZXIsXG4gIHRhcmdldD86IEVsZW1lbnQsXG4gIGtleT86IHN0cmluZyxcbiAgY3RybEtleT86IGJvb2xlYW4sXG4gIG1ldGFLZXk/OiBib29sZWFuLFxuICBzaGlmdEtleT86IGJvb2xlYW5cbik6IEtleWJvYXJkRXZlbnQge1xuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdLZXlib2FyZEV2ZW50JykgYXMgTnpTYWZlQW55O1xuICBjb25zdCBvcmlnaW5hbFByZXZlbnREZWZhdWx0ID0gZXZlbnQucHJldmVudERlZmF1bHQ7XG5cbiAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IGBpbml0S2V5Ym9hcmRFdmVudGAsIGJ1dCBzdXBwb3J0cyBgaW5pdEtleUV2ZW50YC5cbiAgaWYgKGV2ZW50LmluaXRLZXlFdmVudCkge1xuICAgIGV2ZW50LmluaXRLZXlFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsIGtleUNvZGUpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50LmluaXRLZXlib2FyZEV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMCwga2V5LCAwLCAnJywgZmFsc2UpO1xuICB9XG5cbiAgLy8gV2Via2l0IEJyb3dzZXJzIGRvbid0IHNldCB0aGUga2V5Q29kZSB3aGVuIGNhbGxpbmcgdGhlIGluaXQgZnVuY3Rpb24uXG4gIC8vIFNlZSByZWxhdGVkIGJ1ZyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTY3MzVcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZXZlbnQsIHtcbiAgICBrZXlDb2RlOiB7IGdldDogKCkgPT4ga2V5Q29kZSB9LFxuICAgIGtleTogeyBnZXQ6ICgpID0+IGtleSB9LFxuICAgIHRhcmdldDogeyBnZXQ6ICgpID0+IHRhcmdldCB9LFxuICAgIGN0cmxLZXk6IHsgZ2V0OiAoKSA9PiBjdHJsS2V5IH0sXG4gICAgbWV0YUtleTogeyBnZXQ6ICgpID0+IG1ldGFLZXkgfSxcbiAgICBzaGlmdEtleTogeyBnZXQ6ICgpID0+IHNoaWZ0S2V5IH1cbiAgfSk7XG5cbiAgLy8gSUUgd29uJ3Qgc2V0IGBkZWZhdWx0UHJldmVudGVkYCBvbiBzeW50aGV0aWMgZXZlbnRzIHNvIHdlIG5lZWQgdG8gZG8gaXQgbWFudWFsbHkuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0eXBlZGVmXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnZGVmYXVsdFByZXZlbnRlZCcsIHsgZ2V0OiAoKSA9PiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWludmFsaWQtdGhpc1xuICAgIHJldHVybiBvcmlnaW5hbFByZXZlbnREZWZhdWx0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKiogQ3JlYXRlcyBhIGZha2UgZXZlbnQgb2JqZWN0IHdpdGggYW55IGRlc2lyZWQgZXZlbnQgdHlwZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGYWtlRXZlbnQodHlwZTogc3RyaW5nLCBjYW5CdWJibGU6IGJvb2xlYW4gPSB0cnVlLCBjYW5jZWxhYmxlOiBib29sZWFuID0gdHJ1ZSk6IEV2ZW50IHtcbiAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGNhbkJ1YmJsZSwgY2FuY2VsYWJsZSk7XG4gIHJldHVybiBldmVudDtcbn1cbiJdfQ==