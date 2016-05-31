'use strict';

var expect = require('chai').expect;

var Tree = require('../../lib/unreal-filesystem/tree');

describe('tree', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var tree = new Tree();

        expect(tree).to.be.instanceof(Tree);        

        tree.addDir('/foo/');
        tree.addDir('./foo');
        tree.addDir('/foo');
        tree.addDir('/foo/two/three/four');
        tree.addDir('/foo/two/a');
        tree.addDir('/foo/two/b');
        console.log(tree.exists('/foo/two/three/four'));

        tree.log();
        //tree.addDir('/foo/bar/');
        //tree.addDir('/foo/bar/foobar/');

    });

    it.skip('has incrementing inodeNumber', function() {

        var tree = new Tree();

        expect(tree.getLastInodeNumber()).to.be.equal(0);

    });

});

