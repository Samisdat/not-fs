'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/unreal/permission.js',
            'test/unreal/inode-number.js',
            'test/unreal/node.js',
            'test/unreal/root.js',
            'test/unreal/file.js',
            'test/unreal/dir.js',
            'test/unreal/stats.js',
            'test/unreal/virtual-filesystem.js',
        ]
    }
};

module.exports = mochaIstanbul;
