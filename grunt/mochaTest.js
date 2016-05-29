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
            'test/unreal/inode-number.js',
            'test/unreal/node.js',
            'test/unreal/root.js',
            'test/unreal/file.js',
            'test/unreal/dir.js',
            'test/unreal/stats.js',
            'test/unreal/filesystem.js'
        ]
    },
    'tree': {
        src: [
            'test/unreal/tree.js'
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
