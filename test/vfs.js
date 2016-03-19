var Tree = require('../lib/virtual-filesystem/tree');
var tree = new Tree();
var expect = require('chai').expect;
var fs = require('fs');

var util = require('util');

var path = require("path");
var vfs = require('../lib/virtual-io');
vfs.setTree(tree);
'use strict';

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);

    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        
        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);

};


describe('vfs kitchen sink', function() {

    beforeEach(function() {
        rmdir('/tmp/vfs-test');
        if(true === fs.existsSync('/tmp/vfs-test')){
            tree.remove('/tmp/vfs-test');
        }

        fs.mkdirSync('/tmp/vfs-test');
        fs.mkdirSync('/tmp/vfs-test/exist');
        fs.writeFileSync('/tmp/vfs-test/message.txt', 'Hello Node.js', 'utf8');
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

    describe('method fs.writeFileSync', function() {
        
        it('succeed on create and write new file on valid path', function() {

            var exist = fs.existsSync('/tmp/vfs-test/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFileSync('/tmp/vfs-test/a-new-file.txt', 'Hello Node.js', 'utf8');

            var exist = fs.existsSync('/tmp/vfs-test/a-new-file.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/vfs-test/a-new-file.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('method fs.readFileSync', function() {

        it('fail reading an non existing file', function() {

            var exist = fs.existsSync('/tmp/vfs-test/not-a-message.txt');
            expect(exist).to.be.false;

            //     Error: ENOENT, no such file or directory '/tmp/vfs-test/not-a-message.txt'
            expect(fs.readFileSync.bind('/tmp/vfs-test/not-a-message.txt')).to.throw(Error);

        });
        
        it('succeed reading an existing file with encoding', function() {

            var exist = fs.existsSync('/tmp/vfs-test/message.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/vfs-test/message.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

});


