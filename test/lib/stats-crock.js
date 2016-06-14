'use strict';

var expect = require('chai').expect;
var util = require('util');

var Dir = require('../../lib/unreal-filesystem/dir');
var File = require('../../lib/unreal-filesystem/file');

var statsGenerator = require('../../lib/unreal-filesystem/stats-crock');

var options = require('../../lib/unreal-filesystem/options');

describe('stats', function() {

    var dir;
    var file;
    
    beforeEach(function(){
        dir = new Dir(1, 'test');
        file = new File(2, 'test');
    });

    it('can be created', function() {

        var stats = file.getStats();;

        expect(stats).to.have.property('dev');
        expect(stats).to.have.property('mode');
        expect(stats).to.have.property('nlink');
        expect(stats).to.have.property('uid');
        expect(stats).to.have.property('gid');
        expect(stats).to.have.property('rdev');
        expect(stats).to.have.property('blksize');
        expect(stats).to.have.property('ino');
        expect(stats).to.have.property('size');
        expect(stats).to.have.property('blocks');
        expect(stats).to.have.property('atime');
        expect(stats).to.have.property('mtime');
        expect(stats).to.have.property('ctime');
        expect(stats).to.have.property('birthtime');

        expect(stats.isDirectory).to.be.instanceof(Function);
        expect(stats.isFile).to.be.instanceof(Function);
        expect(stats.isBlockDevice).to.be.instanceof(Function);
        expect(stats.isCharacterDevice).to.be.instanceof(Function);
        expect(stats.isSymbolicLink).to.be.instanceof(Function);
        expect(stats.isFIFO).to.be.instanceof(Function);
        expect(stats.isSocket).to.be.instanceof(Function);

    });

    it('dev', function(){

        var stats = file.getStats();;

        expect(stats.dev).to.be.equal(options.getStatsDev());

        expect(stats.dev).to.be.not.equal(options.getStatsRdev());
        stats.dev = 1;
        expect(stats.dev).to.be.equal(1);

    });

    it('rdev', function(){

        var stats = file.getStats();;

        expect(stats.rdev).to.be.equal(options.getStatsRdev());

        expect(stats.rdev).to.be.not.equal(1);
        stats.rdev = 1;
        expect(stats.rdev).to.be.equal(1);

    });

    it.skip('mode', function(){

        //should pass permission & file

    });

    it('nlink', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(1);

        expect(stats.nlink).to.be.not.equal(2);
        stats.nlink = 2;
        expect(stats.nlink).to.be.equal(2);
        

    });

    it('uid', function(){

        var stats = file.getStats();;

        expect(stats.uid).to.be.equal(options.getUser());

        expect(stats.uid).to.be.not.equal(1);
        stats.uid = 1;
        expect(stats.uid).to.be.equal(1);

    });

    it('gid', function(){

        var stats = file.getStats();;

        expect(stats.gid).to.be.equal(options.getGroup());

        expect(stats.gid).to.be.not.equal(1);
        stats.gid = 1;
        expect(stats.gid).to.be.equal(1);

    });

    it('blksize', function(){

        var stats = file.getStats();;

        expect(stats.blksize).to.be.equal(options.getStatsBlksize());

        expect(stats.blksize).to.be.not.equal(2048);
        stats.blksize = 2048;
        expect(stats.blksize).to.be.equal(2048);

    });

    it('ino', function(){

        expect(file.getStats().ino).to.be.equal(2);

        expect(function(){
            file.getStats().ino = 3;
        }).to.throw();

    });

    it.skip('size', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it.skip('blocks', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it.skip('atime', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it.skip('mtime', function(){
        expect(stats).to.be.instanceof(Stats);

        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it.skip('ctime', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it.skip('birthtime', function(){

        var stats = file.getStats();;

        expect(stats.nlink).to.be.equal(options.getStatsNlink());

        expect(stats.nlink).to.be.not.equal(2);
        stats.rdev = 2;
        expect(stats.rdev).to.be.equal(2);

    });

    it('isFile', function() {

        expect(file.getStats().isFile()).to.be.true;
        expect(dir.getStats().isFile()).to.be.false;

    });

    it('isDirectory', function() {

        expect(file.getStats().isDirectory()).to.be.false;
        expect(dir.getStats().isDirectory()).to.be.true;

    });

    it('isBlockDevice', function(){

        expect(file.getStats().isBlockDevice()).to.be.false;
        expect(dir.getStats().isBlockDevice()).to.be.false;

    });

    it('isCharacterDevice', function(){

        expect(file.getStats().isCharacterDevice()).to.be.false;
        expect(dir.getStats().isCharacterDevice()).to.be.false;

    });

    it('isSymbolicLink', function(){

        expect(file.getStats().isSymbolicLink()).to.be.false;
        expect(dir.getStats().isSymbolicLink()).to.be.false;

    });

    it('isFIFO', function(){

        expect(file.getStats().isFIFO()).to.be.false;
        expect(dir.getStats().isFIFO()).to.be.false;

    });

    it('isSocket', function(){

        expect(file.getStats().isSocket()).to.be.false;
        expect(dir.getStats().isSocket()).to.be.false;

    });

});

