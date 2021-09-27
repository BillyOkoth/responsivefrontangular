/**
 * @fileoverview added by tsickle
 * Generated from: dispatch-events.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './event-objects';
/**
 * Utility to dispatch any event on a Node.
 * @param {?} node
 * @param {?} event
 * @return {?}
 */
export function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/**
 * Shorthand to dispatch a fake event on a specified node.
 * @param {?} node
 * @param {?} type
 * @param {?=} canBubble
 * @return {?}
 */
export function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/**
 * Shorthand to dispatch a keyboard event with a specified key code.
 * @param {?} node
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @return {?}
 */
export function dispatchKeyboardEvent(node, type, keyCode, target) {
    return (/** @type {?} */ (dispatchEvent(node, createKeyboardEvent(type, keyCode, target))));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} event
 * @return {?}
 */
export function dispatchMouseEvent(node, type, x, y, event) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (event === void 0) { event = createMouseEvent(type, x, y); }
    return (/** @type {?} */ (dispatchEvent(node, event)));
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @return {?}
 */
export function dispatchTouchEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return (/** @type {?} */ (dispatchEvent(node, createTouchEvent(type, x, y))));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9jb3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJkaXNwYXRjaC1ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBRzNHLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBbUIsRUFBRSxLQUFZO0lBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7OztBQUdELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFtQixFQUFFLElBQVksRUFBRSxTQUFtQjtJQUN0RixPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7Ozs7Ozs7OztBQUdELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLE9BQWUsRUFBRSxNQUFnQjtJQUMvRixPQUFPLG1CQUFBLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFpQixDQUFDO0FBQzFGLENBQUM7Ozs7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLElBQVUsRUFDVixJQUFZLEVBQ1osQ0FBYSxFQUNiLENBQWEsRUFDYixLQUFnRDtJQUZoRCxrQkFBQSxFQUFBLEtBQWE7SUFDYixrQkFBQSxFQUFBLEtBQWE7SUFDYixzQkFBQSxFQUFBLFFBQW9CLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWhELE9BQU8sbUJBQUEsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBYyxDQUFDO0FBQ2xELENBQUM7Ozs7Ozs7OztBQUdELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLENBQWEsRUFBRSxDQUFhO0lBQTVCLGtCQUFBLEVBQUEsS0FBYTtJQUFFLGtCQUFBLEVBQUEsS0FBYTtJQUN2RixPQUFPLG1CQUFBLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFjLENBQUM7QUFDekUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVGYWtlRXZlbnQsIGNyZWF0ZUtleWJvYXJkRXZlbnQsIGNyZWF0ZU1vdXNlRXZlbnQsIGNyZWF0ZVRvdWNoRXZlbnQgfSBmcm9tICcuL2V2ZW50LW9iamVjdHMnO1xuXG4vKiogVXRpbGl0eSB0byBkaXNwYXRjaCBhbnkgZXZlbnQgb24gYSBOb2RlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobm9kZTogTm9kZSB8IFdpbmRvdywgZXZlbnQ6IEV2ZW50KTogRXZlbnQge1xuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBmYWtlIGV2ZW50IG9uIGEgc3BlY2lmaWVkIG5vZGUuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hGYWtlRXZlbnQobm9kZTogTm9kZSB8IFdpbmRvdywgdHlwZTogc3RyaW5nLCBjYW5CdWJibGU/OiBib29sZWFuKTogRXZlbnQge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVGYWtlRXZlbnQodHlwZSwgY2FuQnViYmxlKSk7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBrZXlib2FyZCBldmVudCB3aXRoIGEgc3BlY2lmaWVkIGtleSBjb2RlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoS2V5Ym9hcmRFdmVudChub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIGtleUNvZGU6IG51bWJlciwgdGFyZ2V0PzogRWxlbWVudCk6IEtleWJvYXJkRXZlbnQge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVLZXlib2FyZEV2ZW50KHR5cGUsIGtleUNvZGUsIHRhcmdldCkpIGFzIEtleWJvYXJkRXZlbnQ7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBtb3VzZSBldmVudCBvbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoTW91c2VFdmVudChcbiAgbm9kZTogTm9kZSxcbiAgdHlwZTogc3RyaW5nLFxuICB4OiBudW1iZXIgPSAwLFxuICB5OiBudW1iZXIgPSAwLFxuICBldmVudDogTW91c2VFdmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQodHlwZSwgeCwgeSlcbik6IE1vdXNlRXZlbnQge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBldmVudCkgYXMgTW91c2VFdmVudDtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIHRvdWNoIGV2ZW50IG9uIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hUb3VjaEV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IFRvdWNoRXZlbnQge1xuICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVUb3VjaEV2ZW50KHR5cGUsIHgsIHkpKSBhcyBUb3VjaEV2ZW50O1xufVxuIl19