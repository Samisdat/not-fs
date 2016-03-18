'use strict';

var expect = require('chai').expect;

var Root = require('../../lib/virtual-filesystem/root');
var File = require('../../lib/virtual-filesystem/file');

describe('root', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var root = new Root();

        expect(root).to.be.instanceof(Root);

    });

    it('returns it\'s uuid', function() {

        var root = new Root();
        expect(root.getUuid()).to.be.not.undefined;

    });

    it('returns it\'s name', function() {

        var root = new Root('test');
        expect(root.getName()).to.be.equal('vfs-root');

    });

    it('isRoot is true', function() {

        var root = new Root();

        expect(root.isRoot()).to.be.true;

    });

    it('fqn is false', function() {

        var root = new Root();

        expect(root.getFqn()).to.be.false;

    });

    it('returns undefined parent', function() {

        var root = new Root();

        expect(root.getParent()).to.be.undefined;

    });

    it('add a child', function() {

        var child = new File('child');

        var root = new Root();

        expect(root.getChildren().length).to.be.equal(0);
        expect(root.hasChild()).to.be.false;

        root.addChild(child);

        var children = root.getChildren();
        expect(children).to.deep.equal([child]);

        expect(children[0].getParent()).to.deep.equal(root);
        expect(root.hasChild('child')).to.be.true;
        expect(root.hasChild('other')).to.be.false;

    });

});

