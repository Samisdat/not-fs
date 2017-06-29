'use strict';

import { expect } from 'chai';

import Root from './root';

describe('root', function() {

    let root:Root;

    beforeEach(function() {
        root = new Root();
    });

    it('can be created', function() {

        expect(root).to.be.instanceof(Root);

    });

    it('get it\'s inodenumber', function() {

        expect(root.getInodeNumber()).to.be.equal(0);

    });

    it('get/set it\'s path', function() {

        expect(root.getPath()).to.be.equal('/');

        root.setPath('foobar');
        expect(root.getPath()).to.be.equal('/');

    });

    it('isRoot is true', function() {

        expect(root.isRoot()).to.be.true;

    });

    it('isDir is true', function() {

        expect(root.isDirectory()).to.be.true;

    });

    it('isFile is false', function() {

        expect(root.isFile()).to.be.false;

    });


});

