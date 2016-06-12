'use strict';

var mochaIstanbul = {
    coverage: {
        src: [
            'test/lib/options.js',
            'test/lib/dir.js',
            'test/lib/file.js',
            'test/lib/tree.js',
            'test/lib/node.js',
            'test/lib/permission.js',
            'test/lib/root.js',
            'test/lib/stats.js',

            'test/real/exists.js',
            'test/real/mkdir.js',
            'test/real/readdir.js',
            'test/real/readFile.js',
            'test/real/rename.js',
            'test/real/stat.js',
            'test/real/writeFile.js',

            'test/lib/stats-crock.js'
            
        ]
    },
    tree: {
        src: [
            'test/lib/tree.js'
        ]
    },
    node: {
        src: [
            'test/lib/node.js'
        ]
    },
    dir: {
        src: [
            'test/lib/dir.js'
        ]
    },
    file: {
        src: [
            'test/lib/file.js'
        ]
    },
    root: {
        src: [
            'test/lib/root.js'
        ]
    }
};

module.exports = mochaIstanbul;
