"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
exports.outputNames = {
    [schematics_1.TargetVersion.V7]: [],
    [schematics_1.TargetVersion.V9]: [
        {
            pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4601',
            changes: [
                {
                    replace: 'nzOnSearchNode',
                    replaceWith: 'nzSearchValueChange',
                    whitelist: {
                        elements: ['nz-tree']
                    }
                }
            ]
        }
    ]
};
//# sourceMappingURL=output-names.js.map