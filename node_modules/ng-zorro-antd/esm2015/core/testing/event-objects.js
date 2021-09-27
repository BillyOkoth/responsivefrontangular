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
export function createMouseEvent(type, x = 0, y = 0, button = 0) {
    /** @type {?} */
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true /* canBubble */, false /* cancelable */, window /* view */, 0 /* detail */, x /* screenX */, y /* screenY */, x /* clientX */, y /* clientY */, false /* ctrlKey */, false /* altKey */, false /* shiftKey */, false /* metaKey */, button /* button */, null /* relatedTarget */);
    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: (/**
         * @return {?}
         */
        () => 1) });
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @param {?} type
 * @param {?=} pageX
 * @param {?=} pageY
 * @return {?}
 */
export function createTouchEvent(type, pageX = 0, pageY = 0) {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    /** @type {?} */
    const event = new UIEvent(type, { detail: 0, view: window });
    /** @type {?} */
    const touchDetails = { pageX, pageY, clientX: pageX, clientY: pageY };
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
    const event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
    /** @type {?} */
    const originalPreventDefault = event.preventDefault;
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
            () => keyCode) },
        key: { get: (/**
             * @return {?}
             */
            () => key) },
        target: { get: (/**
             * @return {?}
             */
            () => target) },
        ctrlKey: { get: (/**
             * @return {?}
             */
            () => ctrlKey) },
        metaKey: { get: (/**
             * @return {?}
             */
            () => metaKey) },
        shiftKey: { get: (/**
             * @return {?}
             */
            () => shiftKey) }
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
            () => true), configurable: true });
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
export function createFakeEvent(type, canBubble = true, cancelable = true) {
    /** @type {?} */
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtb2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvY29yZS90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZXZlbnQtb2JqZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsSUFBWSxDQUFDLEVBQUUsSUFBWSxDQUFDLEVBQUUsU0FBaUIsQ0FBQzs7VUFDdkYsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBRWhELEtBQUssQ0FBQyxjQUFjLENBQ2xCLElBQUksRUFDSixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLENBQUMsZ0JBQWdCLEVBQ3RCLE1BQU0sQ0FBQyxVQUFVLEVBQ2pCLENBQUMsQ0FBQyxZQUFZLEVBQ2QsQ0FBQyxDQUFDLGFBQWEsRUFDZixDQUFDLENBQUMsYUFBYSxFQUNmLENBQUMsQ0FBQyxhQUFhLEVBQ2YsQ0FBQyxDQUFDLGFBQWEsRUFDZixLQUFLLENBQUMsYUFBYSxFQUNuQixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsY0FBYyxFQUNwQixLQUFLLENBQUMsYUFBYSxFQUNuQixNQUFNLENBQUMsWUFBWSxFQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQ3pCLENBQUM7SUFFRiw4REFBOEQ7SUFDOUQsa0RBQWtEO0lBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUc7OztRQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQztJQUUxRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7Ozs7O0FBR0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVksRUFBRSxRQUFnQixDQUFDLEVBQUUsUUFBZ0IsQ0FBQzs7OztVQUczRSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUs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Q0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG4vKiogQ3JlYXRlcyBhIGJyb3dzZXIgTW91c2VFdmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgb3B0aW9ucy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb3VzZUV2ZW50KHR5cGU6IHN0cmluZywgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgYnV0dG9uOiBudW1iZXIgPSAwKTogTW91c2VFdmVudCB7XG4gIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcblxuICBldmVudC5pbml0TW91c2VFdmVudChcbiAgICB0eXBlLFxuICAgIHRydWUgLyogY2FuQnViYmxlICovLFxuICAgIGZhbHNlIC8qIGNhbmNlbGFibGUgKi8sXG4gICAgd2luZG93IC8qIHZpZXcgKi8sXG4gICAgMCAvKiBkZXRhaWwgKi8sXG4gICAgeCAvKiBzY3JlZW5YICovLFxuICAgIHkgLyogc2NyZWVuWSAqLyxcbiAgICB4IC8qIGNsaWVudFggKi8sXG4gICAgeSAvKiBjbGllbnRZICovLFxuICAgIGZhbHNlIC8qIGN0cmxLZXkgKi8sXG4gICAgZmFsc2UgLyogYWx0S2V5ICovLFxuICAgIGZhbHNlIC8qIHNoaWZ0S2V5ICovLFxuICAgIGZhbHNlIC8qIG1ldGFLZXkgKi8sXG4gICAgYnV0dG9uIC8qIGJ1dHRvbiAqLyxcbiAgICBudWxsIC8qIHJlbGF0ZWRUYXJnZXQgKi9cbiAgKTtcblxuICAvLyBgaW5pdE1vdXNlRXZlbnRgIGRvZXNuJ3QgYWxsb3cgdXMgdG8gcGFzcyB0aGUgYGJ1dHRvbnNgIGFuZFxuICAvLyBkZWZhdWx0cyBpdCB0byAwIHdoaWNoIGxvb2tzIGxpa2UgYSBmYWtlIGV2ZW50LlxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdidXR0b25zJywgeyBnZXQ6ICgpID0+IDEgfSk7XG5cbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKiogQ3JlYXRlcyBhIGJyb3dzZXIgVG91Y2hFdmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb3VjaEV2ZW50KHR5cGU6IHN0cmluZywgcGFnZVg6IG51bWJlciA9IDAsIHBhZ2VZOiBudW1iZXIgPSAwKTogVUlFdmVudCB7XG4gIC8vIEluIGZhdm9yIG9mIGNyZWF0aW5nIGV2ZW50cyB0aGF0IHdvcmsgZm9yIG1vc3Qgb2YgdGhlIGJyb3dzZXJzLCB0aGUgZXZlbnQgaXMgY3JlYXRlZFxuICAvLyBhcyBhIGJhc2ljIFVJIEV2ZW50LiBUaGUgbmVjZXNzYXJ5IGRldGFpbHMgZm9yIHRoZSBldmVudCB3aWxsIGJlIHNldCBtYW51YWxseS5cbiAgY29uc3QgZXZlbnQgPSBuZXcgVUlFdmVudCh0eXBlLCB7IGRldGFpbDogMCwgdmlldzogd2luZG93IH0pO1xuICBjb25zdCB0b3VjaERldGFpbHMgPSB7IHBhZ2VYLCBwYWdlWSwgY2xpZW50WDogcGFnZVgsIGNsaWVudFk6IHBhZ2VZIH07XG5cbiAgLy8gTW9zdCBvZiB0aGUgYnJvd3NlcnMgZG9uJ3QgaGF2ZSBhIFwiaW5pdFRvdWNoRXZlbnRcIiBtZXRob2QgdGhhdCBjYW4gYmUgdXNlZCB0byBkZWZpbmVcbiAgLy8gdGhlIHRvdWNoIGRldGFpbHMuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV2ZW50LCB7XG4gICAgdG91Y2hlczogeyB2YWx1ZTogW3RvdWNoRGV0YWlsc10gfSxcbiAgICB0YXJnZXRUb3VjaGVzOiB7IHZhbHVlOiBbdG91Y2hEZXRhaWxzXSB9LFxuICAgIGNoYW5nZWRUb3VjaGVzOiB7IHZhbHVlOiBbdG91Y2hEZXRhaWxzXSB9XG4gIH0pO1xuXG4gIHJldHVybiBldmVudDtcbn1cblxuLyoqIERpc3BhdGNoZXMgYSBrZXlkb3duIGV2ZW50IGZyb20gYW4gZWxlbWVudC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXlib2FyZEV2ZW50KFxuICB0eXBlOiBzdHJpbmcsXG4gIGtleUNvZGU6IG51bWJlcixcbiAgdGFyZ2V0PzogRWxlbWVudCxcbiAga2V5Pzogc3RyaW5nLFxuICBjdHJsS2V5PzogYm9vbGVhbixcbiAgbWV0YUtleT86IGJvb2xlYW4sXG4gIHNoaWZ0S2V5PzogYm9vbGVhblxuKTogS2V5Ym9hcmRFdmVudCB7XG4gIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0tleWJvYXJkRXZlbnQnKSBhcyBOelNhZmVBbnk7XG4gIGNvbnN0IG9yaWdpbmFsUHJldmVudERlZmF1bHQgPSBldmVudC5wcmV2ZW50RGVmYXVsdDtcblxuICAvLyBGaXJlZm94IGRvZXMgbm90IHN1cHBvcnQgYGluaXRLZXlib2FyZEV2ZW50YCwgYnV0IHN1cHBvcnRzIGBpbml0S2V5RXZlbnRgLlxuICBpZiAoZXZlbnQuaW5pdEtleUV2ZW50KSB7XG4gICAgZXZlbnQuaW5pdEtleUV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwga2V5Q29kZSk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQuaW5pdEtleWJvYXJkRXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwLCBrZXksIDAsICcnLCBmYWxzZSk7XG4gIH1cblxuICAvLyBXZWJraXQgQnJvd3NlcnMgZG9uJ3Qgc2V0IHRoZSBrZXlDb2RlIHdoZW4gY2FsbGluZyB0aGUgaW5pdCBmdW5jdGlvbi5cbiAgLy8gU2VlIHJlbGF0ZWQgYnVnIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNjczNVxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhldmVudCwge1xuICAgIGtleUNvZGU6IHsgZ2V0OiAoKSA9PiBrZXlDb2RlIH0sXG4gICAga2V5OiB7IGdldDogKCkgPT4ga2V5IH0sXG4gICAgdGFyZ2V0OiB7IGdldDogKCkgPT4gdGFyZ2V0IH0sXG4gICAgY3RybEtleTogeyBnZXQ6ICgpID0+IGN0cmxLZXkgfSxcbiAgICBtZXRhS2V5OiB7IGdldDogKCkgPT4gbWV0YUtleSB9LFxuICAgIHNoaWZ0S2V5OiB7IGdldDogKCkgPT4gc2hpZnRLZXkgfVxuICB9KTtcblxuICAvLyBJRSB3b24ndCBzZXQgYGRlZmF1bHRQcmV2ZW50ZWRgIG9uIHN5bnRoZXRpYyBldmVudHMgc28gd2UgbmVlZCB0byBkbyBpdCBtYW51YWxseS5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnR5cGVkZWZcbiAgZXZlbnQucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdkZWZhdWx0UHJldmVudGVkJywgeyBnZXQ6ICgpID0+IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW52YWxpZC10aGlzXG4gICAgcmV0dXJuIG9yaWdpbmFsUHJldmVudERlZmF1bHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBDcmVhdGVzIGEgZmFrZSBldmVudCBvYmplY3Qgd2l0aCBhbnkgZGVzaXJlZCBldmVudCB0eXBlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZha2VFdmVudCh0eXBlOiBzdHJpbmcsIGNhbkJ1YmJsZTogYm9vbGVhbiA9IHRydWUsIGNhbmNlbGFibGU6IGJvb2xlYW4gPSB0cnVlKTogRXZlbnQge1xuICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICBldmVudC5pbml0RXZlbnQodHlwZSwgY2FuQnViYmxlLCBjYW5jZWxhYmxlKTtcbiAgcmV0dXJuIGV2ZW50O1xufVxuIl19