(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/element-patch', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core['element-patch'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: element-patch.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A patch directive to select the element of a component.
     */
    var NzElementPatchDirective = /** @class */ (function () {
        function NzElementPatchDirective(elementRef) {
            this.elementRef = elementRef;
        }
        NzElementPatchDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[nz-element]',
                        exportAs: 'nzElement'
                    },] }
        ];
        /** @nocollapse */
        NzElementPatchDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        return NzElementPatchDirective;
    }());
    if (false) {
        /** @type {?} */
        NzElementPatchDirective.prototype.elementRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: element-patch.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzElementPatchModule = /** @class */ (function () {
        function NzElementPatchModule() {
        }
        NzElementPatchModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NzElementPatchDirective],
                        exports: [NzElementPatchDirective]
                    },] }
        ];
        return NzElementPatchModule;
    }());

    exports.NzElementPatchDirective = NzElementPatchDirective;
    exports.NzElementPatchModule = NzElementPatchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-element-patch.umd.js.map
