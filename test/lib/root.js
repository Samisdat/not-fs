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

    it('returns it\'s name', function() {

        expect(root.getName()).to.be.equal('/');

    });

    it('isRoot is true', function() {

        expect(root.isRoot()).to.be.true;

    });

    it('isDir is true', function() {

        expect(root.isRoot()).to.be.true;

    });

    it('isFile is false', function() {

        expect(root.isFile()).to.be.false;

    });

    it('returns undefined parent', function() {

        expect(root.getParent()).to.be.undefined;

    });

});

