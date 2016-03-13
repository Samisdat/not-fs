/*global module */

'use strict';

var files = [
    'grunt/*.js',
    'lib/tree/**.js',
    'test/tree/**.js'
];

var eslint = {
    lint: {
        src: files
    },
    lintAndFix: {
        options: {
            fix: true
        },
        src: files
    }
};



module.exports = eslint;
