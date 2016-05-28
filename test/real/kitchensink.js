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
        if(true === fs.existsSync('/tmp/real-test')){
            rmdir('/tmp/real-test');
        }

        fs.mkdirSync('/tmp/real-test');
        fs.mkdirSync('/tmp/real-test/exist');
        fs.writeFileSync('/tmp/real-test/message.txt', 'Hello Node.js', 'utf8');
    });

    describe('method fs.existsSync', function() {

        it('succeed on existing dir', function() {

            var exist = fs.existsSync('/tmp/real-test/exist');

            expect(exist).to.be.true;

        });

        it('fail on not existing dir', function() {

            var exist = fs.existsSync('/tmp/real-test/not-exist');

            expect(exist).to.be.false;

        });

        it('succeed on existing file', function() {

            var exist = fs.existsSync('/tmp/real-test/message.txt');

            expect(exist).to.be.true;

        });

        it('fail on not existing file', function() {

            var exist = fs.existsSync('/tmp/real-test/no-message.txt');

            expect(exist).to.be.false;

        });

    });

    describe('method fs.exists', function() {

        it('succeed on existing dir', function(done) {

            fs.exists('/tmp/real-test/exist', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing dir', function(done) {

            fs.exists('/tmp/real-test/not-exist', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

        it('succeed on existing file', function(done) {

            fs.exists('/tmp/real-test/message.txt', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing file', function(done) {

            fs.exists('/tmp/real-test/no-message.txt', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

    });

    describe('method fs.mkdirSync', function() {

        it('succeed when dir is not already existing', function() {

            var exist = fs.existsSync('/tmp/real-test/not-exist');
            expect(exist).to.be.false;

            fs.mkdirSync('/tmp/real-test/not-exist');

            var exist = fs.existsSync('/tmp/real-test/not-exist');
            expect(exist).to.be.true;


        });

        it('fail when dir is already existing', function() {

            var exist = fs.existsSync('/tmp/real-test/exist');
            expect(exist).to.be.true;
            
            //EEXIST, file already exists '/tmp/real-test/exist''
            expect(fs.mkdirSync.bind('/tmp/real-test/exist')).to.throw(Error);

        });

    });

    describe('method fs.mkdir', function() {

        it('succeed when dir is not already existing', function(done) {

            var exist = fs.existsSync('/tmp/real-test/not-exist');
            expect(exist).to.be.false;

            fs.mkdir('/tmp/real-test/not-exist', function(err){
                if(err){
                    done('failed');
                    return;
                }
                var exist = fs.existsSync('/tmp/real-test/not-exist');
                expect(exist).to.be.true;
                done();

            });



        });

        it('fail when dir is already existing', function(done) {

            var exist = fs.existsSync('/tmp/real-test/exist');
            expect(exist).to.be.true;
            
            //EEXIST, file already exists '/tmp/real-test/exist''
            fs.mkdir('/tmp/real-test/exist', function(err){
                if(err){
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            })

        });

    });

    describe('method fs.readdirSync', function() {

        it('succeed when dir is existing', function() {

            var exist = fs.existsSync('/tmp/real-test/');
            expect(exist).to.be.true;

            var dir = fs.readdirSync('/tmp/real-test/');

            expect(dir).to.deep.equal([ 'exist', 'message.txt' ]);

        });

        it('fail when dir is not existing', function() {

            var exist = fs.existsSync('/tmp/real-test/not-exist');
            expect(exist).to.be.false;
            
            var errorMessage = '';

            try{
                var dir = fs.readdirSync('/tmp/real-test/not-exist');
            }
            catch(e){
                errorMessage = e.message
            }            

            expect(errorMessage).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/real-test/not-exist\'');

        });

    });

    describe('method fs.readdir', function() {

        it('succeed when dir is existing', function(done) {

            var exist = fs.existsSync('/tmp/real-test/');
            expect(exist).to.be.true;

            fs.readdir('/tmp/real-test/', function(err, files){
                if(err){
                    done('failed');
                    return;
                }
                expect(files).to.deep.equal([ 'exist', 'message.txt' ]);
                done();

            });



        });

        it('fail when dir is not existing', function(done) {

            var exist = fs.existsSync('/tmp/real-test/not-exist');
            expect(exist).to.be.false;
            
            //EEXIST, file already exists '/tmp/real-test/exist''
            fs.readdir('/tmp/real-test/not-exist', function(err, files){

                if(err){
                    expect(err.message).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/real-test/not-exist\'');
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            })

        });

    });


    describe('method fs.writeFile', function() {
        
        it('succeed on create and write new file on valid path', function(done) {

            var exist = fs.existsSync('/tmp/real-test/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFile('/tmp/real-test/a-new-file.txt', 'Hello Node.js', function(err) {

                expect(err).to.be.null;
                
                var exist = fs.existsSync('/tmp/real-test/a-new-file.txt');
                expect(exist).to.be.true;

                var content = fs.readFileSync('/tmp/real-test/a-new-file.txt', {encoding: 'utf8'});

                expect(content).to.be.equal('Hello Node.js');
                done();

            });                        

        });

    });

    describe('method fs.writeFileSync', function() {
        
        it('succeed on create and write new file on valid path', function() {

            var exist = fs.existsSync('/tmp/real-test/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFileSync('/tmp/real-test/a-new-file.txt', 'Hello Node.js', 'utf8');

            var exist = fs.existsSync('/tmp/real-test/a-new-file.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/real-test/a-new-file.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('method fs.readFileSync', function() {
        
        it('fail reading an non existing file', function() {

            var exist = fs.existsSync('/tmp/real-test/not-a-message.txt');
            expect(exist).to.be.false;

            // Error: ENOENT, no such file or directory '/tmp/real-test/not-a-message.txt'
            expect(fs.readFileSync.bind('/tmp/real-test/not-a-message.txt')).to.throw(Error);

        });

        it('succeed reading an existing file with encoding', function() {

            var exist = fs.existsSync('/tmp/real-test/message.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/real-test/message.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('method fs.renameSync', function() {
        
        it('succeed on file', function() {

            var orginalExist = fs.existsSync('/tmp/real-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/real-test/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/real-test/message.txt', '/tmp/real-test/message-renamed.txt');

            var orginalExist = fs.existsSync('/tmp/real-test/message.txt');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/real-test/message-renamed.txt');
            expect(renameExist).to.be.true;

        });

        it('succeed on dir', function() {

            var orginalExist = fs.existsSync('/tmp/real-test/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/real-test/renamed');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/real-test/exist', '/tmp/real-test/renamed');

            var orginalExist = fs.existsSync('/tmp/real-test/exist');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/real-test/renamed');
            expect(renameExist).to.be.true;

        });

    });

    describe('method fs.rename', function() {
        
        it('succeed on file', function(done) {

            var orginalExist = fs.existsSync('/tmp/real-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/real-test/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.rename('/tmp/real-test/message.txt', '/tmp/real-test/message-renamed.txt', function(){
                var orginalExist = fs.existsSync('/tmp/real-test/message.txt');
                expect(orginalExist).to.be.false;

                var renameExist = fs.existsSync('/tmp/real-test/message-renamed.txt');
                expect(renameExist).to.be.true;

                done();                
            });


        });

        it('succeed on dir', function(done) {

            var orginalExist = fs.existsSync('/tmp/real-test/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/real-test/renamed');
            expect(renameExist).to.be.false;

            fs.rename('/tmp/real-test/exist', '/tmp/real-test/renamed', function(){

                var orginalExist = fs.existsSync('/tmp/real-test/exist');
                expect(orginalExist).to.be.false;

                var renameExist = fs.existsSync('/tmp/real-test/renamed');
                expect(renameExist).to.be.true;

                done();
            });


        });

    });

    describe('statSync', function() {
        
        it('for a file', function() {

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
        
        it('for a dir', function() {

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

