'use strict';

var expect = require('chai').expect;

var Tree = require('../../lib/unreal-filesystem/filesystem');
var File = require('../../lib/unreal-filesystem/file');
var Dir = require('../../lib/unreal-filesystem/dir');

describe.skip('tree', function() {

    it('can be created', function() {

        var tree = new Tree();

        expect(tree).to.be.instanceof(Tree);
    });

    it('split path into parts', function() {

        var tree = new Tree();

        expect(tree.getParts.bind('./relative')).to.throw();

        expect(tree.getParts('/foo')).to.deep.equal(['foo']);
        expect(tree.getParts('/foo/')).to.deep.equal(['foo']);
        expect(tree.getParts('/foo/bar')).to.deep.equal(['foo', 'bar']);

    });

    it('succeed on add dir', function() {

        var tree = new Tree();

        expect(tree.exists('/one/')).to.be.false;
        expect(tree.isDir('/one/')).to.be.undefined;
        tree.addDir('/one');
        expect(tree.exists('/one')).to.be.true;

        expect(tree.exists('/one/two/')).to.be.false;
        expect(tree.exists('/one/two/three')).to.be.false;
        expect(tree.getByFqn('/one/two/three')).to.be.false;

        tree.addDir('/one/two/three');

        expect(tree.exists('/one/two')).to.be.true;
        expect(tree.exists('/one/two/three')).to.be.true;
        expect(tree.getByFqn('/one/two/three')).to.be.instanceof(Dir);
        expect(tree.isDir('/one/two/three')).to.be.true;

        var alreadyExisting = tree.addDir('/one/two/three');
        expect(alreadyExisting).to.be.undefined;

    });


    it('succeed on add a file', function() {

        var tree = new Tree();

        expect(tree.exists('/file.txt')).to.be.false;
        expect(tree.isFile('/file.txt')).to.be.undefined;
        tree.addFile('/file.txt');
        expect(tree.exists('/file.txt')).to.be.true;
        expect(tree.isFile('/file.txt')).to.be.true;

        expect(tree.exists('/one/')).to.be.false;
        expect(tree.exists('/one/two/')).to.be.false;
        expect(tree.exists('/one/two/file.txt')).to.be.false;
        expect(tree.getByFqn('/one/two/file.txt')).to.be.false;

        tree.addFile('/one/two/file.txt');

        expect(tree.exists('/one/')).to.be.true;
        expect(tree.exists('/one/two/')).to.be.true;
        expect(tree.exists('/one/two/file.txt/')).to.be.true;
        expect(tree.getByFqn('/one/two/file.txt')).to.be.instanceof(File);
        expect(tree.isFile('/one/two/file.txt')).to.be.true;

        var alreadyExisting = tree.addFile('/one/two/file.txt');
        expect(alreadyExisting).to.be.undefined;

    });

    it('succeed in remove a dir or a file', function() {

        var tree = new Tree();

        tree.addFile('/one/two/file.txt');
        expect(tree.isFile('/one/two/file.txt')).to.be.true;

        tree.remove('/one/two/file.txt');
        expect(tree.exists('/one/two/file.txt')).to.be.false;
        expect(tree.remove('/one/two/file.txt')).to.be.undefined;

        tree.addDir('/one/two/three');
        expect(tree.isDir('/one/two/three')).to.be.true;
        tree.remove('/one/two/three');
        expect(tree.exists('/one/two/three')).to.be.false;

    });

});

