'use strict';

var mocha = {
    options: {
        reporter: 'spec',
        captureFile: 'results.txt', // Optionally capture the reporter output to a file
        quiet: false, // Optionally suppress output to standard out (defaults to false)
        clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
    },
    'back': {
        src: [
            'test/lib/permission.js',
            'test/lib/node.js',
            'test/lib/root.js',
            'test/lib/file.js',
            'test/lib/dir.js',
            'test/lib/stats.js',
            'test/lib/tree.js'
        ]
    },
    'tree': {
        src: [
            'test/lib/tree.js'
        ]
    },
    'node': {
        src: [
            'test/lib/node.js'
        ]
    },
    'dir': {
        src: [
            'test/lib/dir.js'
        ]
    },
    'file': {
        src: [
            'test/lib/file.js'
        ]
    },
    'root': {
        src: [
            'test/lib/root.js'
        ]
    },
    'lib': {
        src: [
            'test/lib/kitchensink.js'
        ]
    },
    'real': {
        src: [
            'test/real/kitchensink.js'
        ]
    }
};

module.exports = mocha;
