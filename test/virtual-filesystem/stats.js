'use strict';

var expect = require('chai').expect;
var extend = require('util')._extend;

var File = require('../../lib/virtual-filesystem/file');
var Stats = require('../../lib/virtual-filesystem/stats');


var statsDefault = {
  dev: 51,
  uid: process.getuid(),
  gid: process.getgid(),
  rdev: 0,
  blksize: 4096
};

describe('stats', function() {
    var file = new File('test');

    beforeEach(function() {
    });

    it('can be created', function() {

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

    });

    it('dev', function(){

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

        expect(statsDefault.dev).to.be.not.undefined;
        expect(stats.dev).to.be.equal(statsDefault.dev);

    });

    it('rdev', function(){

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

        expect(statsDefault.rdev).to.be.not.undefined;
        expect(stats.rdev).to.be.equal(statsDefault.rdev);
    });

    it('mode', function(){

        var statsProperties = extend({ mode: 775 }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.mode).to.be.not.undefined;
        expect(stats.mode).to.be.equal(statsProperties.mode);

    });

    it('nlink', function(){

        var statsProperties = extend({ nlink: 1 }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.nlink).to.be.not.undefined;
        expect(stats.nlink).to.be.equal(statsProperties.nlink);


    });

    it('uid', function(){

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

        expect(statsDefault.uid).to.be.not.undefined;
        expect(stats.uid).to.be.equal(statsDefault.uid);

    });

    it('uid', function(){

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

        expect(statsDefault.uid).to.be.not.undefined;
        expect(stats.uid).to.be.equal(statsDefault.uid);        

    });

    it('blksize', function(){

        var stats = new Stats(file, statsDefault);
        expect(stats).to.be.instanceof(Stats);

        expect(statsDefault.blksize).to.be.not.undefined;
        expect(stats.blksize).to.be.equal(statsDefault.blksize);

    });

    it('ino', function(){

        var statsProperties = extend({ ino: 4 }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.ino).to.be.not.undefined;
        expect(stats.ino).to.be.equal(statsProperties.ino);

    });

    it('size', function(){
        
        var statsProperties = extend({ size: 1234 }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.size).to.be.not.undefined;
        expect(stats.size).to.be.equal(statsProperties.size);

    });

    it('blocks', function(){

        var statsProperties = extend({ blocks: 1234 }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.blocks).to.be.not.undefined;
        expect(stats.blocks).to.be.equal(statsProperties.blocks);

    });

    it('atime', function(){

        var statsProperties = extend({ atime: new Date() }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.atime).to.be.not.undefined;
        expect(stats.atime).to.be.equal(statsProperties.atime);

    });

    it('mtime', function(){

        var statsProperties = extend({ mtime: new Date() }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.mtime).to.be.not.undefined;
        expect(stats.mtime).to.be.equal(statsProperties.mtime);

    });
    it('ctime', function(){

        var statsProperties = extend({ ctime: new Date() }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.ctime).to.be.not.undefined;
        expect(stats.ctime).to.be.equal(statsProperties.ctime);

    });

    it('birthtime', function(){

        var statsProperties = extend({ birthtime: new Date() }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(statsProperties.birthtime).to.be.not.undefined;
        expect(stats.birthtime).to.be.equal(statsProperties.birthtime);

    });

    it('correct flags for file', function() {

        var statsProperties = extend({ _isFile: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isFile()).to.be.true;

    });

    it('correct flags for dir', function() {

        var statsProperties = extend({ _isDir: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isDirectory()).to.be.true;

    });

    it('isBlockDevice', function(){

        var statsProperties = extend({ _isBlockDevice: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isBlockDevice()).to.be.true;

    });

    it('isCharacterDevice', function(){

        var statsProperties = extend({ _isCharacterDevice: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isCharacterDevice()).to.be.true;

    });

    it('isSymbolicLink', function(){

        var statsProperties = extend({ _isSymbolicLink: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isSymbolicLink()).to.be.true;

    });

    it('isFIFO', function(){

        var statsProperties = extend({ _isFIFO: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isFIFO()).to.be.true;

    });

    it('isSocket', function(){

        var statsProperties = extend({ _isSocket: true }, statsDefault); 
        
        var stats = new Stats(file, statsProperties);
        expect(stats).to.be.instanceof(Stats);

        expect(stats.isSocket()).to.be.true;

    });

});

