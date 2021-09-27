import { Directive, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: element-patch.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A patch directive to select the element of a component.
 */
class NzElementPatchDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
NzElementPatchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-element]',
                exportAs: 'nzElement'
            },] }
];
/** @nocollapse */
NzElementPatchDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    NzElementPatchDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: element-patch.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzElementPatchModule {
}
NzElementPatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NzElementPatchDirective],
                exports: [NzElementPatchDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-element-patch.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzElementPatchDirective, NzElementPatchModule };
//# sourceMappingURL=ng-zorro-antd-core-element-patch.js.map
