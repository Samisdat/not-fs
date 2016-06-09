'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var prepare = require('./prepare')();

describe('fs.mkdirSync & fs.mkdir', function() {

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

        it('succeed when dir is not already existing', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/not-exist');
            expect(exist).to.be.false;

            fs.mkdirSync('/tmp/unreal-fs/not-exist');

            var exist = fs.existsSync('/tmp/unreal-fs/not-exist');
            expect(exist).to.be.true;

        });

        it('fail when dir is already existing', function() {

            var exist = fs.existsSync('/tmp/unreal-fs/exist');
            expect(exist).to.be.true;

            //EEXIST, file already exists '/tmp/real-test/exist''
            expect(function(){
                fs.mkdirSync('/tmp/unreal-fs/exist')
            }).to.throw(Error);

        });

    });

    describe('async', function() {

        it('succeed when dir is not already existing', function(done) {

            var existBefore = fs.existsSync('/tmp/unreal-fs/not-exist');
            expect(existBefore).to.be.false;

            fs.mkdir('/tmp/unreal-fs/not-exist', function(err){
                if (err){
                    done('failed');
                    return;
                }
                var existAfter = fs.existsSync('/tmp/unreal-fs/not-exist');
                expect(existAfter).to.be.true;
                done();

            });

        });

        it('fail when dir is already existing', function(done) {

            var exist = fs.existsSync('/tmp/unreal-fs/exist');
            expect(exist).to.be.true;

            //EEXIST, file already exists '/tmp/real-test/exist''
            fs.mkdir('/tmp/unreal-fs/exist', function(err){
                if (err){
                    done();
                    return;
                }
                done('should not succeed while dir already exist');
            });

        });

    });

});

