'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/virtual-filesystem/node.js',
            'test/virtual-filesystem/root.js',
            'test/virtual-filesystem/file.js',
            'test/virtual-filesystem/dir.js',
            'test/virtual-filesystem/stats.js',
            'test/virtual-filesystem/tree.js',
            'test/virtual-filesystem/inode-number.js'
        ]
    }
};

module.exports = mochaIstanbul;
