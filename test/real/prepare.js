'use strict';

var fs = require('fs');
var rmdir = require('../_utils/rmdir');

var prepareReal = function(){

    var before = function(){

    };

    var after = function(){

    };

    var beforeEach = function(){
        if (true === fs.existsSync('/tmp/unreal-fs')){
            rmdir('/tmp/unreal-fs');
        }

        fs.mkdirSync('/tmp/unreal-fs');
        fs.mkdirSync('/tmp/unreal-fs/exist');
        fs.writeFileSync('/tmp/unreal-fs/message.txt', 'Hello Node.js', 'utf8');
    };

    return {
        before: before,
        beforeEach: beforeEach,
        after: after
    };
};

var prepareUnreal = function(){

    var unrealFs = require('../../index');

    var before = function(){
        unrealFs.swapIn();
    };

    var after = function(){
        //unrealFs.getTree().log();
        unrealFs.swapOut();
    };

    var beforeEach = function(){

        if (true === fs.existsSync('/tmp/unreal-fs')){
            rmdir('/tmp/unreal-fs');
        }

        if (false === fs.existsSync('/tmp')){
            fs.mkdirSync('/tmp');
        }

        fs.mkdirSync('/tmp/unreal-fs');
        fs.mkdirSync('/tmp/unreal-fs/exist');
        fs.writeFileSync('/tmp/unreal-fs/message.txt', 'Hello Node.js', 'utf8');

    };

    return {
        before: before,
        beforeEach: beforeEach,
        after: after
    };

};

var prepare = function() {

    var realOrUnreal;
    console.log(process.argv[2]);
    if ('mochaTest:fs' === process.argv[2]){
        realOrUnreal = prepareReal();
    }
    else {
        console.log('!UNREAL!');
        realOrUnreal = prepareUnreal();
    }

    return {
        before: realOrUnreal.before,
        beforeEach: realOrUnreal.beforeEach,
        after: realOrUnreal.after

    };

};

module.exports = prepare;
