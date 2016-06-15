'use strict';

var expect = require('chai').expect;

var Root = require('../../lib/unreal-filesystem/root');

describe('root', function() {

    var root;

    beforeEach(function() {
        root = new Root(0);
    });

    it('can be created', function() {

        expect(root).to.be.instanceof(Root);

    });

    it('get it\'s inodenumber', function() {

        expect(root.getInodeNumber()).to.be.equal(0);

    });

    it('get/set it\'s name', function() {

        expect(root.getName()).to.be.equal('/');

        root.setName('foobar');
        expect(root.getName()).to.be.equal('/');

    });

    it('isRoot is true', function() {

        expect(root.isRoot()).to.be.true;

    });

    it('isDir is true', function() {

        expect(root.isDirectory()).to.be.true;

    });

    it('isFile is false', function() {

        expect(root.isFile()).to.be.false;

    });

});

