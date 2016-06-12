'use strict';

var expect = require('chai').expect;
var util = require('util');

var Node = require('../../lib/unreal-filesystem/node');

var statsGenerator = require('../../lib/unreal-filesystem/stats-crock');

describe('stats', function() {

    var node;

    beforeEach(function(){
        node = new Node(1, 'test');
    });

    it('can be created', function() {

        var stats = statsGenerator(node);

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

});

