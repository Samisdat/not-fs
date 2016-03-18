var Tree = require('../lib/virtual-filesystem/tree');
var tree = new Tree();
var expect = require('chai').expect;
var fs = require('fs');

var util = require('util');

var vfs = require('../lib/virtual-io');
vfs.setTree(tree);
'use strict';


describe('vfs kitchen sink', function() {

    beforeEach(function() {
        if(true === fs.existsSync('/tmp/vfs-test')){
            tree.remove('/tmp/vfs-test');
        }

        fs.mkdirSync('/tmp/vfs-test');
        fs.mkdirSync('/tmp/vfs-test/exist');
        tree.addFile('/tmp/vfs-test/message.txt', 'Hello Node.js', 'utf8');
    });

    describe('method fs.existsSync', function() {

        it('succeed on existing dir', function() {

            var exist = fs.existsSync('/tmp/vfs-test/exist');

            expect(exist).to.be.true;

        });

        it('fail on not existing dir', function() {

            var exist = fs.existsSync('/tmp/vfs-test/not-exist');

            expect(exist).to.be.false;

        });

        it('succeed on existing file', function() {

            var exist = fs.existsSync('/tmp/vfs-test/message.txt');

            expect(exist).to.be.true;

        });

        it('fail on not existing file', function() {

            var exist = fs.existsSync('/tmp/vfs-test/no-message.txt');

            expect(exist).to.be.false;

        });

    });

    describe('method fs.exists', function() {

        it('succeed on existing dir', function(done) {

            fs.exists('/tmp/vfs-test/exist', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing dir', function(done) {

            fs.exists('/tmp/vfs-test/not-exist', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

        it('succeed on existing file', function(done) {

            fs.exists('/tmp/vfs-test/message.txt', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing file', function(done) {

            fs.exists('/tmp/vfs-test/no-message.txt', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

    });    

    describe('method fs.mkdirSync', function() {

        it('succeed when dir is not already existing', function() {

            var exist = fs.existsSync('/tmp/vfs-test/not-exist');
            expect(exist).to.be.false;

            fs.mkdirSync('/tmp/vfs-test/not-exist');

            var exist = fs.existsSync('/tmp/vfs-test/not-exist');
            expect(exist).to.be.true;


        });

        it('fail when dir is already existing', function() {

            var exist = fs.existsSync('/tmp/vfs-test/exist');
            expect(exist).to.be.true;
            
            //EEXIST, file already exists '/tmp/vfs-test/exist''
            expect(fs.mkdirSync.bind('/tmp/vfs-test/exist')).to.throw(Error);

        });

    });
    
});


