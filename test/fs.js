'use strict';

var expect = require('chai').expect;

var fs = require('fs');
var path = require("path");

/**
 * https://gist.github.com/tkihira/2367067
 */
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

describe('fs kitchen sink', function() {

    beforeEach(function() {
        if(true === fs.existsSync('/tmp/vfs-test')){
            rmdir('/tmp/vfs-test');
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

    describe('method fs.mkdir', function() {

        it('succeed when dir is not already existing', function(done) {

            var exist = fs.existsSync('/tmp/vfs-test/not-exist');
            expect(exist).to.be.false;

            fs.mkdir('/tmp/vfs-test/not-exist', function(err){
                if(err){
                    done('failed');
                    return;
                }
                var exist = fs.existsSync('/tmp/vfs-test/not-exist');
                expect(exist).to.be.true;
                done();

            });



        });

        it('fail when dir is already existing', function(done) {

            var exist = fs.existsSync('/tmp/vfs-test/exist');
            expect(exist).to.be.true;
            
            //EEXIST, file already exists '/tmp/vfs-test/exist''
            fs.mkdir('/tmp/vfs-test/exist', function(err){
                if(err){
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            })

        });

    });

    describe('method fs.writeFile', function() {
        
        it('succeed on create and write new file on valid path', function(done) {

            var exist = fs.existsSync('/tmp/vfs-test/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFile('/tmp/vfs-test/a-new-file.txt', 'Hello Node.js', function(err) {

                expect(err).to.be.null;
                
                var exist = fs.existsSync('/tmp/vfs-test/a-new-file.txt');
                expect(exist).to.be.true;

                var content = fs.readFileSync('/tmp/vfs-test/a-new-file.txt', {encoding: 'utf8'});

                expect(content).to.be.equal('Hello Node.js');
                done();

            });                        

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

    describe('method fs.renameSync', function() {
        
        it('succeed on file', function() {

            var orginalExist = fs.existsSync('/tmp/vfs-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/vfs-test/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/vfs-test/message.txt', '/tmp/vfs-test/message-renamed.txt');

            var orginalExist = fs.existsSync('/tmp/vfs-test/message.txt');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/vfs-test/message-renamed.txt');
            expect(renameExist).to.be.true;

        });

        it('succeed on dir', function() {

            var orginalExist = fs.existsSync('/tmp/vfs-test/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/vfs-test/renamed');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/vfs-test/exist', '/tmp/vfs-test/renamed');

            var orginalExist = fs.existsSync('/tmp/vfs-test/exist');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/vfs-test/renamed');
            expect(renameExist).to.be.true;

        });

    });

    describe('method fs.rename', function() {
        
        it('succeed on file', function(done) {

            var orginalExist = fs.existsSync('/tmp/vfs-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/vfs-test/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.rename('/tmp/vfs-test/message.txt', '/tmp/vfs-test/message-renamed.txt', function(){
                var orginalExist = fs.existsSync('/tmp/vfs-test/message.txt');
                expect(orginalExist).to.be.false;

                var renameExist = fs.existsSync('/tmp/vfs-test/message-renamed.txt');
                expect(renameExist).to.be.true;

                done();                
            });


        });

        it('succeed on dir', function(done) {

            var orginalExist = fs.existsSync('/tmp/vfs-test/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/vfs-test/renamed');
            expect(renameExist).to.be.false;

            fs.rename('/tmp/vfs-test/exist', '/tmp/vfs-test/renamed', function(){

                var orginalExist = fs.existsSync('/tmp/vfs-test/exist');
                expect(orginalExist).to.be.false;

                var renameExist = fs.existsSync('/tmp/vfs-test/renamed');
                expect(renameExist).to.be.true;

                done();
            });


        });

    });

    describe('statSync', function() {
        
        it('for a file', function() {

            var orginalExist = fs.existsSync('/tmp/vfs-test/message.txt');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/vfs-test/message.txt');

            expect(stats.dev).to.be.equal(51);
            expect(stats.mode).to.be.equal(33188);
            expect(stats.nlink).to.be.equal(1);
            expect(stats.uid).to.be.equal(0);
            expect(stats.gid).to.be.equal(0);
            expect(stats.rdev).to.be.equal(0);
            expect(stats.blksize).to.be.equal(4096);
            expect(stats.ino).to.be.equal(21209);
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
        
        it('for a dir', function() {

            var orginalExist = fs.existsSync('/tmp/vfs-test/exist');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/vfs-test/exist');

            expect(stats.dev).to.be.equal(51);
            expect(stats.mode).to.be.equal(16877);
            expect(stats.nlink).to.be.equal(2);
            expect(stats.uid).to.be.equal(0);
            expect(stats.gid).to.be.equal(0);
            expect(stats.rdev).to.be.equal(0);
            expect(stats.blksize).to.be.equal(4096);
            expect(stats.ino).to.be.equal(12458);
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

