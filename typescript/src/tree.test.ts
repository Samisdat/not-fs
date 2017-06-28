'use strict';

import { expect } from 'chai';

import Tree from './tree';

describe('tree', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var tree = new Tree();

        expect(tree).to.be.instanceof(Tree);

    });

    it('resolves dirs correct', function() {

        var tree = new Tree();

        expect(tree.resolveDir('/')).to.be.equal('/');
        expect(tree.resolveDir('/foo')).to.be.equal('/foo');
        expect(tree.resolveDir('/foo/')).to.be.equal('/foo');
        expect(tree.resolveDir('/foo/bar')).to.be.equal('/foo/bar');
        expect(tree.resolveDir('/foo/bar/')).to.be.equal('/foo/bar');

        //@TODO relative path
        expect(function(){
            tree.resolveDir('./relative');
        }).to.throw('Only absolute path supported');

    });

    it('has incrementing inodeNumber', function() {

        var tree = new Tree();

        expect(tree.getLastInodeNumber()).to.be.equal(0);

        tree.addDir('/foo', true);

        expect(tree.getLastInodeNumber()).to.be.equal(1);

        tree.addDir('/foo/bar', true);

        expect(tree.getLastInodeNumber()).to.be.equal(2);

    });

    it('can add dir', function() {

        var tree = new Tree();

        expect(tree.exists('/foo')).to.be.false;
        expect(tree.exists('/foo/bar')).to.be.false;

        tree.addDir('/foo/bar', true);

        expect(tree.exists('/foo')).to.be.true;
        expect(tree.exists('/foo/bar')).to.be.true;

    });

    it('can remove dir', function() {

        var tree = new Tree();

        tree.addDir('/foo/bar', true);

        expect(tree.exists('/foo/bar')).to.be.true;

        tree.removeDir('/foo/bar');

        expect(tree.exists('/foo/bar')).to.be.false;

    });


});

