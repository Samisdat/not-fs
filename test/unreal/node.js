'use strict';

var expect = require('chai').expect;

var Dir = require('../../lib/unreal-filesystem/dir');
var Node = require('../../lib/unreal-filesystem/node');

describe('node', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var node = new Node('test');

        expect(node).to.be.instanceof(Node);

    });

    it('returns it\'s inodenumber', function() {

        var node = new Node('test');

        expect(node.getInodeNumber()).to.be.not.undefined;

    });

    it('get/set permission', function() {

        var node = new Node('test');

        expect(node.getPermission().getMode()).to.be.equal('0755');

        var parent = new Dir('parent');
        var node = new Node('test', parent, {mode: '0700'});
        expect(node.getPermission().getMode()).to.be.equal('0700');

    });

    it('returns it\'s name', function() {

        var node = new Node('test');

        expect(node.getName()).to.be.equal('test');

    });

    it('isFile is undefined', function() {

        var node = new Node('test');

        expect(node.isFile()).to.be.undefined;

    });

    it('isDir is undefined', function() {

        var node = new Node('test');

        expect(node.isDir()).to.be.undefined;

    });

    it('returns undefined parent', function() {

        var node = new Node('test');

        expect(node.getParent()).to.be.undefined;

    });

    it('returns it\'s parent', function() {

        var parent = new Dir('parent');

        var node = new Node('test', parent);

        expect(node.getParent()).to.deep.equal(parent);

        var node = new Node('test');

        expect(node.getParent()).to.be.undefined;

        node.setParent(parent);

        expect(node.getParent()).to.deep.equal(parent);

    });

});

