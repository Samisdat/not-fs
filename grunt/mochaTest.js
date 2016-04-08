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
            'test/virtual-filesystem/node.js',
            'test/virtual-filesystem/root.js',
            'test/virtual-filesystem/file.js',
            'test/virtual-filesystem/dir.js',
            'test/virtual-filesystem/stats.js',
            'test/virtual-filesystem/virtual-filesystem.js'
        ]
    },
    'single': {
        src: [
            'test/virtual-filesystem/virtual-filesystem.js'
        ]
    },
    'vfs': {
        src: [
            'test/vfs.js'
        ]
    }
};

module.exports = mocha;
