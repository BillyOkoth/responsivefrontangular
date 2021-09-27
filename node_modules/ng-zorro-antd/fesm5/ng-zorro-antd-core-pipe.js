import { CommonModule } from '@angular/common';
import { Pipe, NgModule } from '@angular/core';
import { __read } from 'tslib';
import { timeUnits } from 'ng-zorro-antd/core/time';
import { padStart } from 'ng-zorro-antd/core/util';

/**
 * @fileoverview added by tsickle
 * Generated from: nz-css-unit.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzToCssUnitPipe = /** @class */ (function () {
    function NzToCssUnitPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    NzToCssUnitPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        /** @type {?} */
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    NzToCssUnitPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'nzToCssUnit'
                },] }
    ];
    return NzToCssUnitPipe;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: time-range.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTimeRangePipe = /** @class */ (function () {
    function NzTimeRangePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    NzTimeRangePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    function (value, format) {
        if (format === void 0) { format = 'HH:mm:ss'; }
        /** @type {?} */
        var duration = Number(value || 0);
        return timeUnits.reduce((/**
         * @param {?} current
         * @param {?} __1
         * @return {?}
         */
        function (current, _a) {
            var _b = __read(_a, 2), name = _b[0], unit = _b[1];
            if (current.indexOf(name) !== -1) {
                /** @type {?} */
                var v_1 = Math.floor(duration / unit);
                duration -= v_1 * unit;
                return current.replace(new RegExp(name + "+", 'g'), (/**
                 * @param {?} match
                 * @return {?}
                 */
                function (match) {
                    return padStart(v_1.toString(), match.length, '0');
                }));
            }
            return current;
        }), format);
    };
    NzTimeRangePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'nzTimeRange',
                    pure: true
                },] }
    ];
    return NzTimeRangePipe;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: nz-pipe.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPipesModule = /** @class */ (function () {
    function NzPipesModule() {
    }
    NzPipesModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [NzTimeRangePipe, NzToCssUnitPipe],
                    declarations: [NzTimeRangePipe, NzToCssUnitPipe]
                },] }
    ];
    return NzPipesModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-core-pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzPipesModule, NzTimeRangePipe, NzToCssUnitPipe };
//# sourceMappingURL=ng-zorro-antd-core-pipe.js.map
