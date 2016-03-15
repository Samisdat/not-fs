'use strict';

var expect = require('chai').expect;
var uuid = require('node-uuid');

var Node = require('../../lib/tree/node');

describe('node', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var id = uuid.v4();

        var node = new Node(id, 'test');

        expect(node).to.be.instanceof(Node);

    });

    it('returns it\'s uuid', function() {

        var id = uuid.v4();

        var node = new Node(id, 'test');

        expect(node.getUuid()).to.be.equal(id);

    });

    it('returns it\'s name', function() {

        var id = uuid.v4();

        var node = new Node(id, 'test');

        expect(node.getName()).to.be.equal('test');

    });

    it('returns it\'s full qualified name and depth', function() {

        var id = uuid.v4();

        var id = uuid.v4();
        var root = new Node(id, 'root');
        root.setRoot();

        expect(root.getFqn()).to.be.false;

        var id = uuid.v4();
        var parent = new Node(id, 'parent', root);
        expect(parent.getFqn()).to.be.equal('/parent');
        expect(parent.getDepth()).to.be.equal(1);

        var id = uuid.v4();
        var node = new Node(id, 'child', parent);
        
        expect(node.getFqn()).to.be.equal('/parent/child');
        expect(node.getDepth()).to.be.equal(2);

        var id = uuid.v4();
        var orphan = new Node(id, 'orphan');
        expect(orphan.getFqn()).to.be.false;

    });

    it('returns undefined parent', function() {

        var id = uuid.v4();

        var node = new Node(id, 'test');

        expect(node.getParent()).to.be.undefined;

    });

    it('returns it\'s parent', function() {

        var id = uuid.v4();
        var parent = new Node(id, 'parent');

        var id = uuid.v4();
        var node = new Node(id, 'test', parent);

        expect(node.getParent()).to.deep.equal(parent);

        var id = uuid.v4();
        var node = new Node(id, 'test');

        expect(node.getParent()).to.be.undefined;

        node.setParent(parent);

        expect(node.getParent()).to.deep.equal(parent);

    });

    it('add a child', function() {

        var id = uuid.v4();
        var child = new Node(id, 'child');

        var id = uuid.v4();
        var node = new Node(id, 'test');

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

        var id = uuid.v4();
        var childA = new Node(id, 'childA');

        var id = uuid.v4();
        var childB = new Node(id, 'childB');

        var id = uuid.v4();
        var childC = new Node(id, 'childC');

        var id = uuid.v4();
        var node = new Node(id, 'test');

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

});

