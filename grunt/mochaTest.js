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
            'test/not-fs/permission.js',
            'test/not-fs/inode-number.js',            
            'test/not-fs/node.js',
            'test/not-fs/root.js',
            'test/not-fs/file.js',
            'test/not-fs/dir.js',
            'test/not-fs/stats.js',
            'test/not-fs/virtual-filesystem.js'
        ]
    },
    'single': {
        src: [
            'test/virtual-filesystem/permission.js'
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
