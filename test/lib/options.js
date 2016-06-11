'use strict';

var expect = require('chai').expect;
var extend = require('util')._extend;

var options = require('../../lib/unreal-filesystem/options');

describe('options', function() {

    it('has all getter and setter', function() {

        expect(options.getUser).to.be.instanceof(Function);
        expect(options.setUser).to.be.instanceof(Function);
        expect(options.getGroup).to.be.instanceof(Function);
        expect(options.setGroup).to.be.instanceof(Function);
        expect(options.getStatsDev).to.be.instanceof(Function);
        expect(options.setStatsDev).to.be.instanceof(Function);

    });

    describe('defaults', function() {

        it('uid', function(){

            expect(options.getUser()).to.be.equal(process.getuid());
            options.setUser(123)
            expect(options.getUser()).to.be.equal(123);

        });

        it('gid', function(){
            
            expect(options.getGroup()).to.be.equal(process.getuid());
            options.setGroup(1234)
            expect(options.getGroup()).to.be.equal(1234);

        });

        it('getStatsDev', function(){
            
            expect(options.getStatsDev()).to.be.equal(51);
            options.setStatsDev(55)
            expect(options.getStatsDev()).to.be.equal(55);

        });

        it('getStatsRdev', function(){
            
            expect(options.getStatsRdev()).to.be.equal(0);
            options.setStatsRdev(55)
            expect(options.getStatsRdev()).to.be.equal(55);

        });

        it('statsUid', function(){
            
            expect(options.getStatsUid()).to.be.equal(process.getuid());
            options.setStatsUid(1234)
            expect(options.getStatsUid()).to.be.equal(1234);

        });

        it('statsGid', function(){  
            expect(options.getStatsGid()).to.be.equal(process.getgid());
            options.setStatsGid(1234)
            expect(options.getStatsGid()).to.be.equal(1234);

        });

        it('statsBlksize', function(){
            
            expect(options.getStatsBlksize()).to.be.equal(4096);
            options.setStatsBlksize(1024)
            expect(options.getStatsBlksize()).to.be.equal(1024);

        });

    });

});

