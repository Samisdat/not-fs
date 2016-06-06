'use strict';

var expect = require('chai').expect;

var Dir = require('../../lib/unreal-filesystem/dir');

describe('dir', function() {

    var dir;

    beforeEach(function() {
        dir = new Dir(1, 'test', 0);
    });

    it('can be created', function() {

        expect(dir).to.be.instanceof(Dir);

    });

    it('get it\'s inodenumber', function() {

        expect(dir.getInodeNumber()).to.be.equal(1);

    });

    it('get it\'s name', function() {

        expect(dir.getName()).to.be.equal('test');

    });

    it('get it\'s parent', function() {

        expect(dir.getParent()).to.be.equal(0);

    });

    it('get/set permission', function() {

        expect(dir.getPermission().getMode()).to.be.equal('0755');

        dir.setPermission('0777');
        expect(dir.getPermission().getMode()).to.be.equal('0777');

    });

    it('isRoot is false', function() {

        expect(dir.isRoot()).to.be.false;

    });

    it('isFile is false', function() {

        expect(dir.isFile()).to.be.false;

    });

    it('isDir is true', function() {

        expect(dir.isDir()).to.be.true;

    });

});

