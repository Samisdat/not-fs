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

    it('isOwner', function() {

        expect(node.isOwner()).to.be.true;
        expect(node.isOwner(1)).to.be.false;

    });

    it('isInOwnerGroup', function() {

        expect(node.isInOwnerGroup()).to.be.true;
        expect(node.isInOwnerGroup(1)).to.be.false;

    });

    it('users\'s permission', function() {

        expect(node.uid).to.be.equal(0);
        expect(node.gid).to.be.equal(0);

        node.setPermission('0000');
        expect(node.getPermission().getMode()).to.be.equal('0000');

        expect(node.isReadable(0, 2)).to.be.false;
        expect(node.isWritable(0, 2)).to.be.false;
        expect(node.isExecutable(0, 2)).to.be.false;

        node.setPermission('0100');
        expect(node.getPermission().getMode()).to.be.equal('0100');

        expect(node.isReadable(0, 2)).to.be.false;
        expect(node.isWritable(0, 2)).to.be.false;
        expect(node.isExecutable(0, 2)).to.be.true;

        node.setPermission('0200');
        expect(node.getPermission().getMode()).to.be.equal('0200');

        expect(node.isReadable(0, 2)).to.be.false;
        expect(node.isWritable(0, 2)).to.be.true;
        expect(node.isExecutable(0, 2)).to.be.false;

        node.setPermission('0300');
        expect(node.getPermission().getMode()).to.be.equal('0300');

        expect(node.isReadable(0, 2)).to.be.false;
        expect(node.isWritable(0, 2)).to.be.true;
        expect(node.isExecutable(0, 2)).to.be.true;

        node.setPermission('0400');
        expect(node.getPermission().getMode()).to.be.equal('0400');

        expect(node.isReadable(0, 2)).to.be.true;
        expect(node.isWritable(0, 2)).to.be.false;
        expect(node.isExecutable(0, 2)).to.be.false;

        node.setPermission('0500');
        expect(node.getPermission().getMode()).to.be.equal('0500');

        expect(node.isReadable(0, 2)).to.be.true;
        expect(node.isWritable(0, 2)).to.be.false;
        expect(node.isExecutable(0, 2)).to.be.true;

        node.setPermission('0700');
        expect(node.getPermission().getMode()).to.be.equal('0700');

        expect(node.isReadable(0, 2)).to.be.true;
        expect(node.isWritable(0, 2)).to.be.true;
        expect(node.isExecutable(0, 2)).to.be.true;

    });

    it('groups\'s permission', function() {

        expect(node.uid).to.be.equal(0);
        expect(node.gid).to.be.equal(0);

        node.setPermission('0000');
        expect(node.getPermission().getMode()).to.be.equal('0000');

        expect(node.isReadable(2, 0)).to.be.false;
        expect(node.isWritable(2, 0)).to.be.false;
        expect(node.isExecutable(2, 0)).to.be.false;

        node.setPermission('0010');
        expect(node.getPermission().getMode()).to.be.equal('0010');

        expect(node.isReadable(2, 0)).to.be.false;
        expect(node.isWritable(2, 0)).to.be.false;
        expect(node.isExecutable(2, 0)).to.be.true;

        node.setPermission('0020');
        expect(node.getPermission().getMode()).to.be.equal('0020');

        expect(node.isReadable(2, 0)).to.be.false;
        expect(node.isWritable(2, 0)).to.be.true;
        expect(node.isExecutable(2, 0)).to.be.false;

        node.setPermission('0030');
        expect(node.getPermission().getMode()).to.be.equal('0030');

        expect(node.isReadable(2, 0)).to.be.false;
        expect(node.isWritable(2, 0)).to.be.true;
        expect(node.isExecutable(2, 0)).to.be.true;

        node.setPermission('0040');
        expect(node.getPermission().getMode()).to.be.equal('0040');

        expect(node.isReadable(2, 0)).to.be.true;
        expect(node.isWritable(2, 0)).to.be.false;
        expect(node.isExecutable(2, 0)).to.be.false;

        node.setPermission('0050');
        expect(node.getPermission().getMode()).to.be.equal('0050');

        expect(node.isReadable(2, 0)).to.be.true;
        expect(node.isWritable(2, 0)).to.be.false;
        expect(node.isExecutable(2, 0)).to.be.true;

        node.setPermission('0070');
        expect(node.getPermission().getMode()).to.be.equal('0070');

        expect(node.isReadable(2, 0)).to.be.true;
        expect(node.isWritable(2, 0)).to.be.true;
        expect(node.isExecutable(2, 0)).to.be.true;

    });

    it('anyone\'s permission', function() {

        expect(node.uid).to.be.equal(0);
        expect(node.gid).to.be.equal(0);

        node.setPermission('0000');
        expect(node.getPermission().getMode()).to.be.equal('0000');

        expect(node.isReadable(2, 2)).to.be.false;
        expect(node.isWritable(2, 2)).to.be.false;
        expect(node.isExecutable(2, 2)).to.be.false;

        node.setPermission('0001');
        expect(node.getPermission().getMode()).to.be.equal('0001');

        expect(node.isReadable(2, 2)).to.be.false;
        expect(node.isWritable(2, 2)).to.be.false;
        expect(node.isExecutable(2, 2)).to.be.true;

        node.setPermission('0002');
        expect(node.getPermission().getMode()).to.be.equal('0002');

        expect(node.isReadable(2, 2)).to.be.false;
        expect(node.isWritable(2, 2)).to.be.true;
        expect(node.isExecutable(2, 2)).to.be.false;

        node.setPermission('0003');
        expect(node.getPermission().getMode()).to.be.equal('0003');

        expect(node.isReadable(2, 2)).to.be.false;
        expect(node.isWritable(2, 2)).to.be.true;
        expect(node.isExecutable(2, 2)).to.be.true;

        node.setPermission('0004');
        expect(node.getPermission().getMode()).to.be.equal('0004');

        expect(node.isReadable(2, 2)).to.be.true;
        expect(node.isWritable(2, 2)).to.be.false;
        expect(node.isExecutable(2, 2)).to.be.false;

        node.setPermission('0005');
        expect(node.getPermission().getMode()).to.be.equal('0005');

        expect(node.isReadable(2, 2)).to.be.true;
        expect(node.isWritable(2, 2)).to.be.false;
        expect(node.isExecutable(2, 2)).to.be.true;

        node.setPermission('0007');
        expect(node.getPermission().getMode()).to.be.equal('0007');

        expect(node.isReadable(2, 2)).to.be.true;
        expect(node.isWritable(2, 2)).to.be.true;
        expect(node.isExecutable(2, 2)).to.be.true;

    });    

});

