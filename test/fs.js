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

describe('method fs.existsSync', function() {

    beforeEach(function() {
        if(true === fs.existsSync('/tmp/vfs-test')){
            rmdir('/tmp/vfs-test');
        }

        fs.mkdirSync('/tmp/vfs-test');
        fs.mkdirSync('/tmp/vfs-test/exist');
        fs.writeFileSync('/tmp/vfs-test/message.txt', 'Hello Node.js', 'utf8');
    });

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

