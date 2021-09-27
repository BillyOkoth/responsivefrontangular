/**
 * @fileoverview added by tsickle
 * Generated from: wrapped-error-message.ts
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
 * Gets a RegExp used to detect an angular wrapped error message.
 * See https://github.com/angular/angular/issues/8348
 * @param {?} e
 * @return {?}
 */
export function wrappedErrorMessage(e) {
    /** @type {?} */
    const escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    return new RegExp(escapedMessage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1lcnJvci1tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC9jb3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJ3cmFwcGVkLWVycm9yLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQVE7O1VBQ3BDLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUM7SUFDdkUsT0FBTyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogR2V0cyBhIFJlZ0V4cCB1c2VkIHRvIGRldGVjdCBhbiBhbmd1bGFyIHdyYXBwZWQgZXJyb3IgbWVzc2FnZS5cbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84MzQ4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVkRXJyb3JNZXNzYWdlKGU6IEVycm9yKTogUmVnRXhwIHtcbiAgY29uc3QgZXNjYXBlZE1lc3NhZ2UgPSBlLm1lc3NhZ2UucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy5dL2csICdcXFxcJCYnKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlZE1lc3NhZ2UpO1xufVxuIl19