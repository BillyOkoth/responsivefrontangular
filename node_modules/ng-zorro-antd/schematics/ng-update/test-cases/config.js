"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicsTestTsConfig = {
    compilerOptions: {
        experimentalDecorators: true,
        lib: ['es2015']
    }
};
exports.SchematicsTestNGConfig = {
    projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } }
};
//# sourceMappingURL=config.js.map