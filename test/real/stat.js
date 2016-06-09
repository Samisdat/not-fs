'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.statSync & fs.stat', function() {

    before(function() {
        prepare.before();
    });

    beforeEach(function() {
        prepare.beforeEach();
    });

    after(function() {
        prepare.after();
    });

    describe('sync', function() {

        it.skip('for a file', function() {

            var orginalExist = fs.existsSync('/tmp/real-test/message.txt');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/real-test/message.txt');

            expect(parseInt(stats.dev, 10) === stats.dev).to.be.true;
            expect(stats.dev).to.be.least(stats.dev);
            expect(stats.mode).to.be.equal(33188);
            expect(stats.nlink).to.be.equal(1);
            expect(stats.uid).to.be.equal(0);
            expect(stats.gid).to.be.equal(0);
            expect(stats.rdev).to.be.equal(0);
            expect(stats.blksize).to.be.equal(4096);
            expect(parseInt(stats.ino, 10) === stats.ino).to.be.true;
            expect(stats.ino).to.be.least(stats.dev);
            expect(stats.size).to.be.equal(13);
            expect(stats.blocks).to.be.equal(8);

            expect(stats.isFile()).to.be.true;
            expect(stats.isDirectory()).to.be.false;
            expect(stats.isBlockDevice()).to.be.false;
            expect(stats.isCharacterDevice()).to.be.false;
            expect(stats.isSymbolicLink()).to.be.false;
            expect(stats.isFIFO()).to.be.flase;
            expect(stats.isSocket()).to.be.false;

        });

        it.skip('for a dir', function() {

            var orginalExist = fs.existsSync('/tmp/real-test/exist');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/real-test/exist');

            expect(parseInt(stats.dev, 10) === stats.dev).to.be.true;
            expect(stats.dev).to.be.least(stats.dev);
            expect(stats.mode).to.be.equal(16877);
            expect(stats.nlink).to.be.equal(2);
            expect(stats.uid).to.be.equal(0);
            expect(stats.gid).to.be.equal(0);
            expect(stats.rdev).to.be.equal(0);
            expect(stats.blksize).to.be.equal(4096);
            expect(parseInt(stats.ino, 10) === stats.ino).to.be.true;
            expect(stats.ino).to.be.least(stats.dev);
            expect(stats.size).to.be.equal(4096);
            expect(stats.blocks).to.be.equal(8);

            expect(stats.isFile()).to.be.false;
            expect(stats.isDirectory()).to.be.true;
            expect(stats.isBlockDevice()).to.be.false;
            expect(stats.isCharacterDevice()).to.be.false;
            expect(stats.isSymbolicLink()).to.be.false;
            expect(stats.isFIFO()).to.be.false;
            expect(stats.isSocket()).to.be.false;

        });

    });

});

