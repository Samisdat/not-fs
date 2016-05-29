'use strict';

var expect = require('chai').expect;

var Tree = require('../../lib/unreal-filesystem/tree');

describe('tree', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var tree = new Tree();

        expect(tree).to.be.instanceof(Tree);        

    });

    it('has incrementing inodeNumber', function() {

        var tree = new Tree();

        expect(tree.getLastInodeNumber()).to.be.equal(0);

    });

});

