'use strict';

var expect = require('chai').expect;

var File = require('../../lib/virtual-filesystem/file');
var Dir = require('../../lib/virtual-filesystem/dir');

var Stats = require('../../lib/virtual-filesystem/stats');

describe('stats', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var file = new File('test');
        var stats = new Stats(file);

        expect(stats).to.be.instanceof(Stats);

    });

    it.skip('dev', function(){

    });
    it.skip('mode', function(){

    });
    it.skip('nlink', function(){

    });
    it.skip('uid', function(){

    });
    it.skip('gid', function(){

    });
    it.skip('rdev', function(){

    });
    it.skip('blksize', function(){

    });
    it.skip('ino', function(){

    });
    it.skip('size', function(){

    });
    it.skip('blocks', function(){

    });
    it.skip('atime', function(){

    });
    it.skip('mtime', function(){

    });
    it.skip('ctime', function(){

    });
    it.skip('birthtime', function(){

    });

    it('correct flags for file', function() {

        var file = new File('test');
        var stats = new Stats(file);

        expect(stats.isDirectory()).to.be.false;
        expect(stats.isFile()).to.be.true;

    });

    it('correct flags for fir', function() {

        var dir = new Dir('test');
        var stats = new Stats(dir);

        expect(stats.isDirectory()).to.be.true;
        expect(stats.isFile()).to.be.false;

    });

    it.skip('isBlockDevice', function(){

    });

    it.skip('isCharacterDevice', function(){

    });

    it.skip('isSymbolicLink', function(){

    });

    it.skip('isFIFO', function(){

    });

    it.skip('isSocket', function(){

    });

});

