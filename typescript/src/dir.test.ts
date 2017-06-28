'use strict';

import { expect } from 'chai';

import Dir from './dir';

describe('dir', function() {

    let dir:Dir;

    beforeEach(function() {
        dir = new Dir(1, 'test');
    });

    it('can be created', function() {

        expect(dir).to.be.instanceof(Dir);

    });

    it('get it\'s inodenumber', function() {

        expect(dir.getInodeNumber()).to.be.equal(1);

    });

    it('get/set it\'s name', function() {

        expect(dir.getName()).to.be.equal('test');

        dir.setName('foobar');
        expect(dir.getName()).to.be.equal('foobar');

    });

    it('get/set permission', function() {

        expect(dir.getPermission().getMode()).to.be.equal('0755');

        dir.setPermission('0777');
        expect(dir.getPermission().getMode()).to.be.equal('0777');

    });

    it('isRoot is false', function() {

        expect(dir.isRoot()).to.be.false;

    });

    it('isFile is false', function() {

        expect(dir.isFile()).to.be.false;

    });

    it('isDirectory is true', function() {

        expect(dir.isDirectory()).to.be.true;

    });

});

