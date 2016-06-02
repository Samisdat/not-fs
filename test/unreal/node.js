'use strict';

var expect = require('chai').expect;

var Dir = require('../../lib/unreal-filesystem/dir');
var Node = require('../../lib/unreal-filesystem/node');

describe('node', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var node = new Node(1, 'test', 0);

        expect(node).to.be.instanceof(Node);

    });

    it('returns it\'s inodenumber', function() {

        var node = new Node(1, 'test', 0);

        expect(node.getInodeNumber()).to.be.equal(1);

    });

    it('get  parent', function() {

        var node = new Node(1, 'test', 0);

        expect(node.getParent()).to.be.equal(0);

    });

    it('set  parent', function() {

        var node = new Node(1, 'test', 0);

        expect(node.getParent()).to.be.equal(0);

        node.setParent(1);

        expect(node.getParent()).to.be.equal(1);

    });

    it('returns it\'s name', function() {

        var node = new Node(1, 'test', 0);

        expect(node.getName()).to.be.equal('test');

    });

    it('get/set permission', function() {

        var node = new Node(1, 'test', 0);

        expect(node.getPermission().getMode()).to.be.equal('0755');

        node.setPermission('0777')
        expect(node.getPermission().getMode()).to.be.equal('0777');

    });

    it('isRoot is false', function() {

        var node = new Node(1, 'test', 0);

        expect(node.isRoot()).to.be.false;

    });

    it('isFile is undefined', function() {

        var node = new Node('test');

        expect(node.isFile()).to.be.undefined;

    });

    it('isDir is undefined', function() {

        var node = new Node('test');

        expect(node.isDir()).to.be.undefined;

    });

});

