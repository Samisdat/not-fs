'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/not-fs/permission.js',
            'test/not-fs/inode-number.js',
            'test/not-fs/node.js',
            'test/not-fs/root.js',
            'test/not-fs/file.js',
            'test/not-fs/dir.js',
            'test/not-fs/stats.js',
            'test/not-fs/virtual-filesystem.js',
        ]
    }
};

module.exports = mochaIstanbul;
