'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/unreal/dir.js',
            'test/unreal/file.js',
            'test/unreal/filesystem.js',
            'test/unreal/node.js',
            'test/unreal/permission.js',
            'test/unreal/inode-number.js',
            'test/unreal/root.js',
            'test/unreal/stats.js'
        ]
    },
    tree: {
        src: [
            'test/unreal/tree.js'
        ]
    }
};

module.exports = mochaIstanbul;
