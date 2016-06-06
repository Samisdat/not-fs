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
            'test/unreal/permission.js',
            'test/unreal/node.js',
            'test/unreal/root.js',
            'test/unreal/file.js',
            'test/unreal/dir.js',
            'test/unreal/stats.js',
            'test/unreal/tree.js'
        ]
    },
    'tree': {
        src: [
            'test/unreal/tree.js'
        ]
    },
    'node': {
        src: [
            'test/unreal/node.js'
        ]
    },
    'dir': {
        src: [
            'test/unreal/dir.js'
        ]
    },
    'file': {
        src: [
            'test/unreal/file.js'
        ]
    },
    'root': {
        src: [
            'test/unreal/root.js'
        ]
    },
    'unreal': {
        src: [
            'test/unreal/kitchensink.js'
        ]
    },
    'real': {
        src: [
            'test/real/kitchensink.js'
        ]
    }
};

module.exports = mocha;
