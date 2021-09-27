import { CommonModule } from '@angular/common';
import { Pipe, NgModule } from '@angular/core';
import { timeUnits } from 'ng-zorro-antd/core/time';
import { padStart } from 'ng-zorro-antd/core/util';

/**
 * @fileoverview added by tsickle
 * Generated from: nz-css-unit.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzToCssUnitPipe {
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    transform(value, defaultUnit = 'px') {
        /** @type {?} */
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
NzToCssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzToCssUnit'
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: time-range.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzTimeRangePipe {
    /**
     * @param {?} value
     * @param {?=} format
     * @return {?}
     */
    transform(value, format = 'HH:mm:ss') {
        /** @type {?} */
        let duration = Number(value || 0);
        return timeUnits.reduce((/**
         * @param {?} current
         * @param {?} __1
         * @return {?}
         */
        (current, [name, unit]) => {
            if (current.indexOf(name) !== -1) {
                /** @type {?} */
                const v = Math.floor(duration / unit);
                duration -= v * unit;
                return current.replace(new RegExp(`${name}+`, 'g'), (/**
                 * @param {?} match
                 * @return {?}
                 */
                (match) => {
                    return padStart(v.toString(), match.length, '0');
                }));
            }
            return current;
        }), format);
    }
}
NzTimeRangePipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzTimeRange',
                pure: true
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: nz-pipe.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzPipesModule {
}
NzPipesModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [NzTimeRangePipe, NzToCssUnitPipe],
                declarations: [NzTimeRangePipe, NzToCssUnitPipe]
            },] }
];

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
