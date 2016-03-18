'use strict';

var expect = require('chai').expect;

var File = require('../../lib/virtual-filesystem/file');

describe('file', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var file = new File('test');

        expect(file).to.be.instanceof(File);

    });
    it('returns it\'s uuid', function() {

        var file = new File('test');

        expect(file.getUuid()).to.be.not.undefined;

    });

    it('returns it\'s name', function() {

        var file = new File('test');

        expect(file.getName()).to.be.equal('test');

    });

    it('isFile is undefined', function() {

        var file = new File('test');

        expect(file.isFile()).to.be.true;

    });

    it('isDir is undefined', function() {

        var file = new File('test');

        expect(file.isDir()).to.be.false;

    });
/*

    it('returns it\'s full qualified name and depth', function() {

        var root = new Node('root');
        root.setRoot();

        expect(root.getFqn()).to.be.false;

        var parent = new Node('parent', root);
        expect(parent.getFqn()).to.be.equal('/parent');
        expect(parent.getDepth()).to.be.equal(1);

        var node = new Node('child', parent);

        expect(node.getFqn()).to.be.equal('/parent/child');
        expect(node.getDepth()).to.be.equal(2);

        var orphan = new Node('orphan');
        expect(orphan.getFqn()).to.be.false;

    });

    it('returns undefined parent', function() {

        var node = new Node('test');

        expect(node.getParent()).to.be.undefined;

    });

    it('returns it\'s parent', function() {

        var parent = new Node('parent');

        var node = new Node('test', parent);

        expect(node.getParent()).to.deep.equal(parent);

        var node = new Node('test');

        expect(node.getParent()).to.be.undefined;

        node.setParent(parent);

        expect(node.getParent()).to.deep.equal(parent);

    });

    it('add a child', function() {

        var child = new Node('child');

        var node = new Node('test');

        expect(node.getChildren().length).to.be.equal(0);
        expect(node.hasChild()).to.be.false;

        node.addChild(child);

        var children = node.getChildren();
        expect(children).to.deep.equal([child]);

        expect(children[0].getParent()).to.deep.equal(node);
        expect(node.hasChild('child')).to.be.true;
        expect(node.hasChild('other')).to.be.false;

    });

    it('can remove a child', function() {

        var childA = new Node('childA');
        var childB = new Node('childB');
        var childC = new Node('childC');

        var node = new Node('test');

        node.addChild(childA);
        node.addChild(childB);
        node.addChild(childC);

        expect(node.getChildren().length).to.be.equal(3);
        expect(node.getChildren()).to.deep.equal([childA, childB, childC]);

        node.removeChild(childB);
        expect(node.getChildren().length).to.be.equal(2);
        expect(node.getChildren()).to.deep.equal([childA, childC]);

        expect(node.removeChild.bind(childB)).to.throw();

    });

    it('can not add two children with same name', function() {

        var childA = new Node('childA');
        var childB = new Node('childB');
        var childC = new Node('childB');

        var node = new Node('test');

        node.addChild(childA);
        node.addChild(childB);

        expect(node.getChildren().length).to.be.equal(2);
        expect(node.getChildren()).to.deep.equal([childA, childB]);

        expect(node.addChild.bind(childC)).to.throw();
    });
    */

});

