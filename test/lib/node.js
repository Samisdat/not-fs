'use strict';

var expect = require('chai').expect;

var Node = require('../../lib/unreal-filesystem/node');

describe('node', function() {

    var node;

    beforeEach(function() {
        node = new Node(1, 'test');
    });

    it('is instanceof Node', function() {

        expect(node).to.be.instanceof(Node);

    });

    it('get it\'s inodenumber', function() {

        expect(node.getInodeNumber()).to.be.equal(1);

    });

    it('get it\'s name', function() {

        expect(node.getName()).to.be.equal('test');

        node.setName('foobar');
        expect(node.getName()).to.be.equal('foobar');

    });

    it('get/set permission', function() {

        expect(node.getPermission().getMode()).to.be.equal('0755');

        node.setPermission('0777');
        expect(node.getPermission().getMode()).to.be.equal('0777');

    });

    it('isRoot is false', function() {

        expect(node.isRoot()).to.be.false;

    });

    it('isFile is undefined', function() {

        expect(node.isFile()).to.be.undefined;

    });

    it('isDirectory is undefined', function() {

        expect(node.isDirectory()).to.be.undefined;

    });

    it('isBlockDevice is false', function() {

        expect(node.isBlockDevice()).to.be.false;

    });

    it('isCharacterDevice is false', function() {

        expect(node.isCharacterDevice()).to.be.false;

    });

    it('isSymbolicLink is false', function() {

        expect(node.isSymbolicLink()).to.be.false;

    });

    it('isFIFO is false', function() {

        expect(node.isFIFO()).to.be.false;

    });

    it('isSocket is false', function() {

        expect(node.isSocket()).to.be.false;

    });

});

