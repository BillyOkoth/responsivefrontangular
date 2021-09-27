(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ng-zorro-antd/core/trans-button', ['exports', '@angular/common', '@angular/core'], factory) :
    (global = global || self, factory((global['ng-zorro-antd'] = global['ng-zorro-antd'] || {}, global['ng-zorro-antd'].core = global['ng-zorro-antd'].core || {}, global['ng-zorro-antd'].core['trans-button'] = {}), global.ng.common, global.ng.core));
}(this, (function (exports, common, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: nz-trans-button.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NzTransButtonDirective = /** @class */ (function () {
        function NzTransButtonDirective() {
        }
        NzTransButtonDirective.decorators = [
            { type: core.Directive, args: [{
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
            { type: core.NgModule, args: [{
                        declarations: [NzTransButtonDirective],
                        exports: [NzTransButtonDirective],
                        imports: [common.CommonModule]
                    },] }
        ];
        return NzTransButtonModule;
    }());

    exports.NzTransButtonDirective = NzTransButtonDirective;
    exports.NzTransButtonModule = NzTransButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-zorro-antd-core-trans-button.umd.js.map
