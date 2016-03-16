'use strict';

var expect = require('chai').expect;

var Root = require('../../lib/tree/root');
var Dir = require('../../lib/tree/dir');

describe('dir', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var dir = new Dir('test');

        expect(dir).to.be.instanceof(Dir);

    });

    it('returns it\'s uuid', function() {

        var dir = new Dir('test');

        expect(dir.getUuid()).to.be.not.undefined;

    });

    it('returns it\'s name', function() {

        var dir = new Dir('test');

        expect(dir.getName()).to.be.equal('test');

    });

    it('isFile is undefined', function() {

        var dir = new Dir('test');

        expect(dir.isFile()).to.be.false;

    });

    it('isDir is undefined', function() {

        var dir = new Dir('test');

        expect(dir.isDir()).to.be.true;

    });

    it('returns it\'s full qualified name and depth', function() {

        var root = new Root('root');

        expect(root.getFqn()).to.be.false;

        var parent = new Dir('parent', root);
        expect(parent.getFqn()).to.be.equal('/parent');
        expect(parent.getDepth()).to.be.equal(1);

        var dir = new Dir('child', parent);
        
        expect(dir.getFqn()).to.be.equal('/parent/child');
        expect(dir.getDepth()).to.be.equal(2);

        var orphan = new Dir('orphan');
        expect(orphan.getFqn()).to.be.false;

    });

    it('returns undefined parent', function() {

        var dir = new Dir('test');

        expect(dir.getParent()).to.be.undefined;

    });

    it('returns it\'s parent', function() {

        var parent = new Dir('parent');

        var dir = new Dir('test', parent);

        expect(dir.getParent()).to.deep.equal(parent);

        var dir = new Dir('test');

        expect(dir.getParent()).to.be.undefined;

        dir.setParent(parent);

        expect(dir.getParent()).to.deep.equal(parent);

    });

    it('add a child', function() {

        var child = new Dir('child');

        var dir = new Dir('test');

        expect(dir.getChildren().length).to.be.equal(0);
        expect(dir.hasChild()).to.be.false;

        dir.addChild(child);

        var children = dir.getChildren();
        expect(children).to.deep.equal([child]);

        expect(children[0].getParent()).to.deep.equal(dir);
        expect(dir.hasChild('child')).to.be.true;
        expect(dir.hasChild('other')).to.be.false;

    });

    it('can remove a child', function() {

        var childA = new Dir('childA');
        var childB = new Dir('childB');
        var childC = new Dir('childC');

        var dir = new Dir('test');

        dir.addChild(childA);
        dir.addChild(childB);
        dir.addChild(childC);

        expect(dir.getChildren().length).to.be.equal(3);
        expect(dir.getChildren()).to.deep.equal([childA, childB, childC]);

        dir.removeChild(childB);
        expect(dir.getChildren().length).to.be.equal(2);
        expect(dir.getChildren()).to.deep.equal([childA, childC]);

        expect(dir.removeChild.bind(childB)).to.throw();

    });

    it('can not add two children with same name', function() {

        var childA = new Dir('childA');
        var childB = new Dir('childB');
        var childC = new Dir('childB');

        var dir = new Dir('test');

        dir.addChild(childA);
        dir.addChild(childB);

        expect(dir.getChildren().length).to.be.equal(2);
        expect(dir.getChildren()).to.deep.equal([childA, childB]);
        
        try{
            dir.addChild(childC);
        }
        catch(e){
            expect(dir.getChildren().length).to.be.equal(2);
            expect(dir.getChildren()).to.deep.equal([childA, childB]);
        }
        //expect(dir.addChild.bind(childC)).to.throw();
    });

});

