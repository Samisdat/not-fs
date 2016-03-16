/*global module */

'use strict';

var files = [
    'grunt/*.js',
    'lib/vfs/**.js',
    'test/vfs/**.js'
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
