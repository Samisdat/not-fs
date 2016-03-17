'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/vfs/node.js',
            'test/vfs/root.js',
            'test/vfs/file.js',
            'test/vfs/dir.js',
            'test/vfs/tree.js'
        ]
    }
};

module.exports = mochaIstanbul;
