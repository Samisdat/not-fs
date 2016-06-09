'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.renameSync & fs.rename', function() {

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

        it('succeed on file', function() {

            var orginalExist = fs.existsSync('/tmp/unreal-fs/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/unreal-fs/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/unreal-fs/message.txt', '/tmp/unreal-fs/message-renamed.txt');

            var orginalExist = fs.existsSync('/tmp/unreal-fs/message.txt');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/unreal-fs/message-renamed.txt');
            expect(renameExist).to.be.true;

        });

        it('succeed on dir', function() {

            var orginalExist = fs.existsSync('/tmp/unreal-fs/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/unreal-fs/renamed');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/unreal-fs/exist', '/tmp/unreal-fs/renamed');

            var orginalExist = fs.existsSync('/tmp/unreal-fs/exist');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/unreal-fs/renamed');
            expect(renameExist).to.be.true;

        });

    });

    describe('async', function() {

        it('succeed on file', function(done) {

            var orginalExistBefore = fs.existsSync('/tmp/unreal-fs/message.txt');
            expect(orginalExistBefore).to.be.true;

            var renameExistBefore = fs.existsSync('/tmp/unreal-fs/message-renamed.txt');
            expect(renameExistBefore).to.be.false;

            fs.rename('/tmp/unreal-fs/message.txt', '/tmp/unreal-fs/message-renamed.txt', function(){
                var orginalExistAfter = fs.existsSync('/tmp/unreal-fs/message.txt');
                expect(orginalExistAfter).to.be.false;

                var renameExistAfter = fs.existsSync('/tmp/unreal-fs/message-renamed.txt');
                expect(renameExistAfter).to.be.true;

                done();
            });


        });

        it('succeed on dir', function(done) {

            var orginalExistBefore = fs.existsSync('/tmp/unreal-fs/exist');
            expect(orginalExistBefore).to.be.true;

            var renameExistBefore = fs.existsSync('/tmp/unreal-fs/renamed');
            expect(renameExistBefore).to.be.false;

            fs.rename('/tmp/unreal-fs/exist', '/tmp/unreal-fs/renamed', function(){

                var orginalExistAfter = fs.existsSync('/tmp/unreal-fs/exist');
                expect(orginalExistAfter).to.be.false;

                var renameExistAfter = fs.existsSync('/tmp/unreal-fs/renamed');
                expect(renameExistAfter).to.be.true;

                done();
            });


        });

    });

});

