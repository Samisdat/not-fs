'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/virtual-filesystem/node.js',
            'test/virtual-filesystem/root.js',
            'test/virtual-filesystem/file.js',
            'test/virtual-filesystem/dir.js',
            'test/virtual-filesystem/tree.js'
        ]
    }
};

module.exports = mochaIstanbul;
