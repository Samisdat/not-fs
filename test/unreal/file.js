'use strict';

var expect = require('chai').expect;

var Root = require('../../lib/unreal-filesystem/root');
var Dir = require('../../lib/unreal-filesystem/dir');
var File = require('../../lib/unreal-filesystem/file');

describe('file', function() {

    var file;

    beforeEach(function() {
        file = new File(1, 'test', 0);
    });

    it('can be created', function() {

        expect(file).to.be.instanceof(File);

    });

    it('get it\'s inodenumber', function() {

        expect(file.getInodeNumber()).to.be.equal(1);

    });

    it('get/set permission', function() {

        expect(file.getPermission().getMode()).to.be.equal('0644');

        file.setPermission('0777')
        expect(file.getPermission().getMode()).to.be.equal('0777');

    });

    it('get it\'s name', function() {

        expect(file.getName()).to.be.equal('test');

    });

    it('isRoot is false', function() {

        expect(file.isRoot()).to.be.false;

    });

    it('isFile is true', function() {

        expect(file.isFile()).to.be.true;

    });

    it('isDir is false', function() {

        expect(file.isDir()).to.be.false;

    });

    it('get/set content', function() {

        expect(file.getContent()).to.be.equal('');

        file.setContent('foobar');

        expect(file.getContent()).to.be.equal('foobar');

    });

});

