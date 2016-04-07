'use strict';

var expect = require('chai').expect;

var innodeNumber = require('../../lib/virtual-filesystem/inode-number');

describe('dir', function() {

    it('can be created', function() {

        var i = innodeNumber();
        expect(i).to.be.equal(0);

        var i = innodeNumber();
        expect(i).to.be.equal(1);

        var i = innodeNumber();
        expect(i).to.be.equal(2);

        var i = innodeNumber();
        expect(i).to.be.equal(3);

        var i = innodeNumber();
        expect(i).to.be.equal(4);

    });

});

