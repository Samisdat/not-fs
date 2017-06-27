'use strict';

module.exports = function () {

    var typescript = {
        dist: {
            tsconfig: 'typescript/src/tsconfig.json',
            src: ['typescript/src/**/*.ts'],
            outDir: 'typescript/dist',
        }
    };

    return typescript;

};
