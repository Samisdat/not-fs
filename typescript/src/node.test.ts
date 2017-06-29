'use strict';

import { expect } from 'chai';

import Node from './node';

describe('node', function() {

    let node:Node;

    beforeEach(function() {
    });

    it('can be created', function() {

        node = new Node(1, 'test');

        expect(node).to.be.instanceof(Node);

    });

    it('get it\'s inodenumber', function() {

        expect(node.getInodeNumber()).to.be.equal(1);

    });

    it('get it\'s path', function() {

        expect(node.getPath()).to.be.equal('test');

        node.setPath('foobar');
        expect(node.getPath()).to.be.equal('foobar');

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

