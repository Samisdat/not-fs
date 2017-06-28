'use strict';

var path = require('path');

module.exports = function (grunt) {

    var mocha = {
        options: {
            reporter: 'spec',
            quiet: false, // Optionally suppress output to standard out (defaults to false)
            clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)
            require: 'source-map-support/register'
        },
        'back': {
            src: [
                'test/lib/options.js',
                'test/lib/permission.js',
                'test/lib/node.js',
                'test/lib/root.js',
                'test/lib/file.js',
                'test/lib/dir.js',
                'test/lib/stats.js',
                'test/lib/tree.js'
            ]
        },
        'tree': {
            src: [
                'test/lib/tree.js'
            ]
        },
        'node': {
            src: [
                'test/lib/node.js'
            ]
        },
        'dir': {
            src: [
                'test/lib/dir.js'
            ]
        },
        'file': {
            src: [
                'test/lib/file.js'
            ]
        },
        'root': {
            src: [
                'test/lib/root.js'
            ]
        },
        'opt': {
            src: [
                'test/lib/options.js'
            ]
        },
        'stats': {
            src: [
                'test/lib/stats.js'
            ]
        },
        'fs': {
            src: [
                'test/real/exists.js',
                'test/real/mkdir.js',
                'test/real/readdir.js',
                'test/real/readFile.js',
                'test/real/rename.js',
                'test/real/stat.js',
                'test/real/writeFile.js'
            ]
        },
        'unreal-fs': {
            src: [
                'test/real/exists.js',
                'test/real/mkdir.js',
                'test/real/readdir.js',
                'test/real/readFile.js',
                'test/real/rename.js',
                'test/real/stat.js',
                'test/real/writeFile.js'
            ]
        },
        'dev': {
            src: [
                'test/real/readFile.js'
            ]
        },
        'typescript': {
            src: [
                'typescript/dist/**/*.test.js'
            ]
        },
        'watch': {
            src: [
                'typescript/dist/**/*.test.js'
            ]
        }

    };




    var getTestFile = function (filepath) {

        if (grunt.file.isMatch(['**/*.test.js'], filepath)) {
            return filepath;
        }

        return filepath.replace(/\.js$/, '.test.js');


    };

    grunt.event.on('watch', function (action, filepath) {

        var test = getTestFile(filepath);

        grunt.config.set('mochaTest.watch.src', [test]);



    });

    return mocha;

};