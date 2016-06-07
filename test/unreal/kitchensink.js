'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var path = require('path');

var unrealFs = require('../../index');

/**
 * @TODO replace by rmdir module
 */
var rmdir = function(dir) {
    var list = fs.readdirSync(dir);

    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);

        //@TODO the next lines are an error
        if (false === fs.existsSync(filename)){
            continue;
        }

        var stat = fs.statSync(filename);

        if ('.' === filename || '..' === filename) {
            // pass these files
        } else if (stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);

};

describe('unrealFs kitchen sink', function() {

    before(function(){
        unrealFs.swapIn();
        //unrealFs.getTree().log();
    });

    after(function(){
        //unrealFs.getTree().log();
        unrealFs.swapOut();
    });

    beforeEach(function() {

        if (true === fs.existsSync('/tmp/unreal-test')){
            rmdir('/tmp/unreal-test');
        }

        if (false === fs.existsSync('/tmp')){
            fs.mkdirSync('/tmp');
        }

        fs.mkdirSync('/tmp/unreal-test');
        fs.mkdirSync('/tmp/unreal-test/exist');
        fs.writeFileSync('/tmp/unreal-test/message.txt', 'Hello Node.js', 'utf8');
    });

    describe('method fs.existsSync', function() {

        it('succeed on existing dir', function() {

            var exist = fs.existsSync('/tmp/unreal-test/exist');

            expect(exist).to.be.true;

        });

        it('fail on not existing dir', function() {

            var exist = fs.existsSync('/tmp/unreal-test/not-exist');

            expect(exist).to.be.false;

        });

        it('succeed on existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-test/message.txt');

            expect(exist).to.be.true;

        });

        it('fail on not existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-test/no-message.txt');

            expect(exist).to.be.false;

        });

    });

    describe('method fs.exists', function() {

        it('succeed on existing dir', function(done) {

            fs.exists('/tmp/unreal-test/exist', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing dir', function(done) {

            fs.exists('/tmp/unreal-test/not-exist', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

        it('succeed on existing file', function(done) {

            fs.exists('/tmp/unreal-test/message.txt', function(exist){
                expect(exist).to.be.true;
                done();
            });

        });

        it('fail on not existing file', function(done) {

            fs.exists('/tmp/unreal-test/no-message.txt', function(exist){
                expect(exist).to.be.false;
                done();
            });

        });

    });

    describe('method fs.mkdirSync', function() {

        it('succeed when dir is not already existing', function() {
            /*
            var exist = fs.existsSync('/tmp/unreal-test/not-exist');
            expect(exist).to.be.false;
            */
            fs.mkdirSync('/tmp/unreal-test/not-exist');

            var exist = fs.existsSync('/tmp/unreal-test/not-exist');
            expect(exist).to.be.true;


        });

        it('fail when dir is already existing', function() {

            var exist = fs.existsSync('/tmp/unreal-test/exist');
            expect(exist).to.be.true;

            //EEXIST, file already exists '/tmp/unreal-test/exist''
            expect(function(){
                fs.mkdirSync('/tmp/unreal-test/exist');
            }).to.throw(Error);

        });

    });

    describe('method fs.readdirSync', function() {

        it('succeed when dir is existing', function() {

            var exist = fs.existsSync('/tmp/unreal-test/');
            expect(exist).to.be.true;

            var dir = fs.readdirSync('/tmp/unreal-test/');

            expect(dir).to.deep.equal([ 'exist', 'message.txt' ]);

        });

        it('fail when dir is not existing', function() {

            var exist = fs.existsSync('/tmp/unreal-test/not-exist');
            expect(exist).to.be.false;

            var errorMessage = '';

            try {
                fs.readdirSync('/tmp/unreal-test/not-exist');
            }
            catch (e){
                errorMessage = e.message;
            }

            expect(errorMessage).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/unreal-test/not-exist\'');

        });

    });

    describe('method fs.readdir', function() {

        it('succeed when dir is existing', function(done) {

            var exist = fs.existsSync('/tmp/unreal-test/');
            expect(exist).to.be.true;

            fs.readdir('/tmp/unreal-test/', function(err, files){
                if (err){
                    done('failed');
                    return;
                }
                expect(files).to.deep.equal([ 'exist', 'message.txt' ]);
                done();

            });

        });

        it('fail when dir is not existing', function(done) {

            var exist = fs.existsSync('/tmp/unreal-test/not-exist');
            expect(exist).to.be.false;

            //EEXIST, file already exists '/tmp/unreal-test/exist''
            fs.readdir('/tmp/unreal-test/not-exist', function(err){

                if (err){
                    expect(err.message).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/unreal-test/not-exist\'');
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            });

        });

    });

    describe('method fs.writeFile', function() {

        it('succeed on create and write new file on valid path', function(done) {

            var existBefore = fs.existsSync('/tmp/unreal-test/a-new-file.txt');
            expect(existBefore).to.be.false;

            fs.writeFile('/tmp/unreal-test/a-new-file.txt', 'Hello Node.js', {encoding: 'utf8'}, function(err) {

                expect(err).to.be.null;

                var existAfter = fs.existsSync('/tmp/unreal-test/a-new-file.txt');
                expect(existAfter).to.be.true;

                var content = fs.readFileSync('/tmp/unreal-test/a-new-file.txt', {encoding: 'utf8'});

                expect(content).to.be.equal('Hello Node.js');
                done();

            });

        });

    });

    describe('method fs.writeFileSync', function() {

        it('succeed on create and write new file on valid path', function() {

            var exist = fs.existsSync('/tmp/unreal-test/a-new-file.txt');
            expect(exist).to.be.false;

            fs.writeFileSync('/tmp/unreal-test/a-new-file.txt', 'Hello Node.js', 'utf8');

            var exist = fs.existsSync('/tmp/unreal-test/a-new-file.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/unreal-test/a-new-file.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('method fs.readFileSync', function() {

        it('fail reading an non existing file', function() {

            var exist = fs.existsSync('/tmp/unreal-test/not-a-message.txt');
            expect(exist).to.be.false;

            //     Error: ENOENT, no such file or directory '/tmp/unreal-test/not-a-message.txt'
            expect(fs.readFileSync.bind('/tmp/unreal-test/not-a-message.txt')).to.throw(Error);

        });

        it('succeed reading an existing file with encoding', function() {

            var exist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(exist).to.be.true;

            var content = fs.readFileSync('/tmp/unreal-test/message.txt', {encoding: 'utf8'});
            expect(content).to.be.equal('Hello Node.js');

        });

    });

    describe('method fs.renameSync', function() {

        it('succeed on renaming file within same dir', function() {
            var orginalExist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/unreal-test/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/unreal-test/message.txt', '/tmp/unreal-test/message-renamed.txt');

            var orginalExist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/unreal-test/message-renamed.txt');
            expect(renameExist).to.be.true;

        });

        it('succeed on renaming file within same dir', function() {
            var orginalExist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/some-other-dir/message-renamed.txt');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/unreal-test/message.txt', '/tmp/some-other-dir/message-renamed.txt');

            var orginalExist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/some-other-dir/message-renamed.txt');
            expect(renameExist).to.be.true;

        });

        it('succeed on dir', function() {

            var orginalExist = fs.existsSync('/tmp/unreal-test/exist');
            expect(orginalExist).to.be.true;

            var renameExist = fs.existsSync('/tmp/unreal-test/renamed');
            expect(renameExist).to.be.false;

            fs.renameSync('/tmp/unreal-test/exist', '/tmp/unreal-test/renamed');

            var orginalExist = fs.existsSync('/tmp/unreal-test/exist');
            expect(orginalExist).to.be.false;

            var renameExist = fs.existsSync('/tmp/unreal-test/renamed');
            expect(renameExist).to.be.true;

        });

    });

    describe('method fs.rename', function() {

        it('succeed on file', function(done) {

            var orginalExistBefore = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExistBefore).to.be.true;

            var renameExistBefore = fs.existsSync('/tmp/unreal-test/message-renamed.txt');
            expect(renameExistBefore).to.be.false;

            fs.rename('/tmp/unreal-test/message.txt', '/tmp/unreal-test/message-renamed.txt', function(){

                var orginalExistAfter = fs.existsSync('/tmp/unreal-test/message.txt');
                expect(orginalExistAfter).to.be.false;

                var renameExistAfter = fs.existsSync('/tmp/unreal-test/message-renamed.txt');
                expect(renameExistAfter).to.be.true;

                done();

            });

        });

        it('succeed on dir', function(done) {

            var orginalExistBefore = fs.existsSync('/tmp/unreal-test/exist');
            expect(orginalExistBefore).to.be.true;

            var renameExistBefore = fs.existsSync('/tmp/unreal-test/renamed');
            expect(renameExistBefore).to.be.false;

            fs.rename('/tmp/unreal-test/exist', '/tmp/unreal-test/renamed', function(){

                var orginalExistAfter = fs.existsSync('/tmp/unreal-test/exist');
                expect(orginalExistAfter).to.be.false;

                var renameExistAfter = fs.existsSync('/tmp/unreal-test/renamed');
                expect(renameExistAfter).to.be.true;

                done();

            });

        });

    });

    describe.skip('statSync', function() {

        it.skip('for a file', function() {

            var orginalExist = fs.existsSync('/tmp/unreal-test/message.txt');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/unreal-test/message.txt');
            console.log(stats);

        });

        it.skip('for a dir', function() {

            var orginalExist = fs.existsSync('/tmp/unreal-test/exist');
            expect(orginalExist).to.be.true;

            var stats = fs.statSync('/tmp/unreal-test/exist');
            console.log(stats);

        });

    });


});


