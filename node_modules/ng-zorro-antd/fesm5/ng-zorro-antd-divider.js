import { __decorate, __metadata } from 'tslib';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

/**
 * @fileoverview added by tsickle
 * Generated from: divider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzDividerComponent = /** @class */ (function () {
    function NzDividerComponent() {
        this.nzType = 'horizontal';
        this.nzOrientation = 'center';
        this.nzDashed = false;
    }
    NzDividerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-divider',
                    exportAs: 'nzDivider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <span *ngIf=\"nzText\" class=\"ant-divider-inner-text\">\n      <ng-container *nzStringTemplateOutlet=\"nzText\">{{ nzText }}</ng-container>\n    </span>\n  ",
                    host: {
                        '[class.ant-divider]': 'true',
                        '[class.ant-divider-horizontal]': "nzType === 'horizontal'",
                        '[class.ant-divider-vertical]': "nzType === 'vertical'",
                        '[class.ant-divider-with-text-left]': "nzText && nzOrientation === 'left'",
                        '[class.ant-divider-with-text-right]': "nzText && nzOrientation === 'right'",
                        '[class.ant-divider-with-text-center]': "nzText && nzOrientation === 'center'",
                        '[class.ant-divider-dashed]': "nzDashed"
                    }
                }] }
    ];
    NzDividerComponent.propDecorators = {
        nzText: [{ type: Input }],
        nzType: [{ type: Input }],
        nzOrientation: [{ type: Input }],
        nzDashed: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzDividerComponent.prototype, "nzDashed", void 0);
    return NzDividerComponent;
}());
if (false) {
    /** @type {?} */
    NzDividerComponent.ngAcceptInputType_nzDashed;
    /** @type {?} */
    NzDividerComponent.prototype.nzText;
    /** @type {?} */
    NzDividerComponent.prototype.nzType;
    /** @type {?} */
    NzDividerComponent.prototype.nzOrientation;
    /** @type {?} */
    NzDividerComponent.prototype.nzDashed;
}

/**
 * @fileoverview added by tsickle
 * Generated from: divider.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzDividerModule = /** @class */ (function () {
    function NzDividerModule() {
    }
    NzDividerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NzOutletModule],
                    declarations: [NzDividerComponent],
                    exports: [NzDividerComponent]
                },] }
    ];
    return NzDividerModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-divider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzDividerComponent, NzDividerModule };
//# sourceMappingURL=ng-zorro-antd-divider.js.map
