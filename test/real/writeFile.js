'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.writeFileSync & fs.writeFile', function() {

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

        it('succeed on create and write new file on valid path', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFileSync('/tmp/unreal-fs/a-new-file.txt', 'Hello Node.js', 'utf8');

            var exist = fs.existsSync('/tmp/unreal-fs/a-new-file.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/unreal-fs/a-new-file.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('async', function() {

        it('succeed on create and write new file on valid path', function(done) {

            var existBefore = fs.existsSync('/tmp/unreal-fs/a-new-file.txt');
            expect(existBefore).to.be.false;

            fs.writeFile('/tmp/unreal-fs/a-new-file.txt', 'Hello Node.js', {encoding: 'utf8'}, function(err) {

                expect(err).to.be.null;

                var existAfter = fs.existsSync('/tmp/unreal-fs/a-new-file.txt');
                expect(existAfter).to.be.true;

                var content = fs.readFileSync('/tmp/unreal-fs/a-new-file.txt', {encoding: 'utf8'});

                expect(content).to.be.equal('Hello Node.js');
                done();

            });

        });

    });

});

