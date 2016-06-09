'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.existsSync & fs.exists', function() {

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

        it('succeed on existing dir', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/exist');

            expect(exist).to.be.true;

        });

        it('fail on not existing dir', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/not-exist');

            expect(exist).to.be.false;

        });

        it('succeed on existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/message.txt');

            expect(exist).to.be.true;

        });

        it('fail on not existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/no-message.txt');

            expect(exist).to.be.false;

        });

    });

    describe('async', function() {

        it('succeed on existing dir', function(done) {

            fs.exists('/tmp/unreal-fs/exist', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing dir', function(done) {

            fs.exists('/tmp/unreal-fs/not-exist', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

        it('succeed on existing file', function(done) {

            fs.exists('/tmp/unreal-fs/message.txt', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing file', function(done) {

            fs.exists('/tmp/unreal-fs/no-message.txt', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

    });

});

