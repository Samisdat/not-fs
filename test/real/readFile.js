'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.readFileSync & fs.readFile', function() {

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

        it('fail reading an non existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/not-a-message.txt');
            expect(exist).to.be.false;

            // Error: ENOENT, no such file or directory '/tmp/unreal-fs/not-a-message.txt'
            expect(fs.readFileSync.bind('/tmp/unreal-fs/not-a-message.txt')).to.throw(Error);

        });

        it('succeed reading an existing file with encoding', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/message.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/unreal-fs/message.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('async', function() {

        it('fail reading an non existing file', function(done) {

            var exist = fs.readFile('/tmp/unreal-fs/not-a-message.txt', {encoding: 'utf8'}, function(err, data){
                console.log(err.message)
                expect(err).to.match(/^Error: ENOENT: no such file or directory/);
                expect(data).to.be.undefined;
                done();
            });

        });

        it('succeed reading an existing file with encoding', function(done) {

            var exist = fs.readFile('/tmp/unreal-fs/message.txt', {encoding: 'utf8'}, function(err, data){
                expect(err).to.be.null;
                expect(data).to.be.equal('Hello Node.js');
                done();
            });

        });

    });

});

