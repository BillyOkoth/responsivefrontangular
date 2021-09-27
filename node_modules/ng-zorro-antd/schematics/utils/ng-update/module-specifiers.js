"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
exports.materialModuleSpecifier = 'ng-zorro-antd';
function isNgZorroImportDeclaration(node) {
    return isNgZorroDeclaration(schematics_1.getImportDeclaration(node));
}
exports.isNgZorroImportDeclaration = isNgZorroImportDeclaration;
function isNgZorroDeclaration(declaration) {
    if (!declaration.moduleSpecifier) {
        return false;
    }
    const moduleSpecifier = declaration.moduleSpecifier.getText();
    return moduleSpecifier.indexOf(exports.materialModuleSpecifier) !== -1;
}
//# sourceMappingURL=module-specifiers.js.map