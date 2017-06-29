'use strict';

import { expect } from 'chai';

import File from './file';

describe('dir', function() {

    let file:File;

    beforeEach(function() {
        file = new File(1, 'test');
    });

    it('can be created', function() {

        expect(file).to.be.instanceof(File);

    });

    it('get it\'s inodenumber', function() {

        expect(file.getInodeNumber()).to.be.equal(1);

    });

    it('get/set permission', function() {

        expect(file.getPermission().getMode()).to.be.equal('0644');

        file.setPermission('0777');
        expect(file.getPermission().getMode()).to.be.equal('0777');

    });

    it('get/set it\'s pathPart', function() {

        expect(file.getPathPart()).to.be.equal('test');

        file.setPathPart('foobar');
        expect(file.getPathPart()).to.be.equal('foobar');

    });

    it('isRoot is false', function() {

        expect(file.isRoot()).to.be.false;

    });

    it('isFile is true', function() {

        expect(file.isFile()).to.be.true;

    });

    it('isDirectory is false', function() {

        expect(file.isDirectory()).to.be.false;

    });

    it('get/set content', function() {

        expect(file.getContent()).to.be.equal('');

        file.setContent('foobar');

        expect(file.getContent()).to.be.equal('foobar');

        file.setContent('');

        expect(file.getContent()).to.be.equal('');

    });

});

