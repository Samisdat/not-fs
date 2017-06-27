'use strict';

module.exports = function () {

    var typescript = {
        dist: {
            options: {
                sourceMap: true,
                target: 'es6',
                rootDir: 'typescript/src'
            },
            src: ['typescript/src/**/*.ts'],
            outDir: 'typescript/dist',
        }
    };

    return typescript;

};
