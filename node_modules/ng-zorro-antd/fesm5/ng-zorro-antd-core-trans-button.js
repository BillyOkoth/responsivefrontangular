import { CommonModule } from '@angular/common';
import { Directive, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: nz-trans-button.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTransButtonDirective = /** @class */ (function () {
    function NzTransButtonDirective() {
    }
    NzTransButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'button[nz-trans-button]',
                    host: {
                        '[style.border]': '"0"',
                        '[style.background]': '"transparent"',
                        '[style.padding]': '"0"',
                        '[style.line-height]': '"inherit"'
                    }
                },] }
    ];
    return NzTransButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: nz-trans-button.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTransButtonModule = /** @class */ (function () {
    function NzTransButtonModule() {
    }
    NzTransButtonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NzTransButtonDirective],
                    exports: [NzTransButtonDirective],
                    imports: [CommonModule]
                },] }
    ];
    return NzTransButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-trans-button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzTransButtonDirective, NzTransButtonModule };
//# sourceMappingURL=ng-zorro-antd-core-trans-button.js.map
