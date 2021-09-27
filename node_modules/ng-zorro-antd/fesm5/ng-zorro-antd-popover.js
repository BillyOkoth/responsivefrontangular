import { __extends } from 'tslib';
import { Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Renderer2, Host, Optional, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, NgModule } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective, NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzTooltipBaseDirective, isTooltipEmpty, NzToolTipComponent, NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';

/**
 * @fileoverview added by tsickle
 * Generated from: popover.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPopoverDirective = /** @class */ (function (_super) {
    __extends(NzPopoverDirective, _super);
    function NzPopoverDirective(elementRef, hostView, resolver, renderer, noAnimation) {
        var _this = _super.call(this, elementRef, hostView, resolver, renderer, noAnimation) || this;
        _this.noAnimation = noAnimation;
        _this.componentFactory = _this.resolver.resolveComponentFactory(NzPopoverComponent);
        return _this;
    }
    NzPopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-popover]',
                    exportAs: 'nzPopover',
                    host: {
                        '[class.ant-popover-open]': 'visible'
                    }
                },] }
    ];
    /** @nocollapse */
    NzPopoverDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzPopoverDirective.propDecorators = {
        specificTitle: [{ type: Input, args: ['nzPopoverTitle',] }],
        specificContent: [{ type: Input, args: ['nzPopoverContent',] }],
        directiveNameTitle: [{ type: Input, args: ['nz-popover',] }],
        specificTrigger: [{ type: Input, args: ['nzPopoverTrigger',] }],
        specificPlacement: [{ type: Input, args: ['nzPopoverPlacement',] }],
        specificOrigin: [{ type: Input, args: ['nzPopoverOrigin',] }]
    };
    return NzPopoverDirective;
}(NzTooltipBaseDirective));
if (false) {
    /** @type {?} */
    NzPopoverDirective.prototype.specificTitle;
    /** @type {?} */
    NzPopoverDirective.prototype.specificContent;
    /** @type {?} */
    NzPopoverDirective.prototype.directiveNameTitle;
    /** @type {?} */
    NzPopoverDirective.prototype.specificTrigger;
    /** @type {?} */
    NzPopoverDirective.prototype.specificPlacement;
    /** @type {?} */
    NzPopoverDirective.prototype.specificOrigin;
    /** @type {?} */
    NzPopoverDirective.prototype.componentFactory;
    /** @type {?} */
    NzPopoverDirective.prototype.noAnimation;
}
var NzPopoverComponent = /** @class */ (function (_super) {
    __extends(NzPopoverComponent, _super);
    function NzPopoverComponent(cdr, noAnimation) {
        var _this = _super.call(this, cdr, noAnimation) || this;
        _this.noAnimation = noAnimation;
        _this._prefix = 'ant-popover-placement';
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    NzPopoverComponent.prototype.isEmpty = /**
     * @protected
     * @return {?}
     */
    function () {
        return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
    };
    NzPopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-popover',
                    exportAs: 'nzPopoverComponent',
                    animations: [zoomBigMotion],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    template: "\n    <ng-template\n      #overlay=\"cdkConnectedOverlay\"\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n      (backdropClick)=\"hide()\"\n      (detach)=\"hide()\"\n      (positionChange)=\"onPositionChange($event)\"\n      [cdkConnectedOverlayPositions]=\"_positions\"\n      [cdkConnectedOverlayOpen]=\"_visible\"\n    >\n      <div\n        class=\"ant-popover\"\n        [ngClass]=\"_classMap\"\n        [ngStyle]=\"nzOverlayStyle\"\n        [@.disabled]=\"noAnimation?.nzNoAnimation\"\n        [nzNoAnimation]=\"noAnimation?.nzNoAnimation\"\n        [@zoomBigMotion]=\"'active'\"\n      >\n        <div class=\"ant-popover-content\">\n          <div class=\"ant-popover-arrow\"></div>\n          <div class=\"ant-popover-inner\" role=\"tooltip\">\n            <div>\n              <div class=\"ant-popover-title\" *ngIf=\"nzTitle\">\n                <ng-container *nzStringTemplateOutlet=\"nzTitle\">{{ nzTitle }}</ng-container>\n              </div>\n              <div class=\"ant-popover-inner-content\">\n                <ng-container *nzStringTemplateOutlet=\"nzContent\">{{ nzContent }}</ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPopoverComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    return NzPopoverComponent;
}(NzToolTipComponent));
if (false) {
    /** @type {?} */
    NzPopoverComponent.prototype._prefix;
    /** @type {?} */
    NzPopoverComponent.prototype.noAnimation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: popover.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPopoverModule = /** @class */ (function () {
    function NzPopoverModule() {
    }
    NzPopoverModule.decorators = [
        { type: NgModule, args: [{
                    exports: [NzPopoverDirective, NzPopoverComponent],
                    entryComponents: [NzPopoverComponent],
                    declarations: [NzPopoverDirective, NzPopoverComponent],
                    imports: [CommonModule, OverlayModule, NzOutletModule, NzOverlayModule, NzNoAnimationModule, NzToolTipModule]
                },] }
    ];
    return NzPopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-popover.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzPopoverComponent, NzPopoverDirective, NzPopoverModule };
//# sourceMappingURL=ng-zorro-antd-popover.js.map
