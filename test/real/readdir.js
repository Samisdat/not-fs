'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.readdirSync & fs.readdir', function() {

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

        it('succeed when dir is existing', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/');
            expect(exist).to.be.true;

            var dir = fs.readdirSync('/tmp/unreal-fs/');

            expect(dir).to.deep.equal([ 'exist', 'message.txt' ]);

        });

        it('fail when dir is not existing', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/not-exist');
            expect(exist).to.be.false;

            var errorMessage = '';

            try {
                fs.readdirSync('/tmp/unreal-fs/not-exist');
            }
            catch (e){
                errorMessage = e.message;
            }

            expect(errorMessage).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/unreal-fs/not-exist\'');

        });

    });

    describe('async', function() {

        it('succeed when dir is existing', function(done) {

            var exist = fs.existsSync('/tmp/unreal-fs/');
            expect(exist).to.be.true;

            fs.readdir('/tmp/unreal-fs/', function(err, files){
                if (err){
                    done('failed');
                    return;
                }
                expect(files).to.deep.equal([ 'exist', 'message.txt' ]);
                done();

            });

        });

        it('fail when dir is not existing', function(done) {

            var exist = fs.existsSync('/tmp/unreal-fs/not-exist');
            expect(exist).to.be.false;

            //EEXIST, file already exists '/tmp/unreal-fs/exist''
            fs.readdir('/tmp/unreal-fs/not-exist', function(err){

                if (err){
                    expect(err.message).to.be.equal('ENOENT: no such file or directory, scandir \'/tmp/unreal-fs/not-exist\'');
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            });

        });

    });

});

