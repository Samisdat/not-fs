var Tree = require('../lib/vfs/tree');
var tree = new Tree();

var fs = require('../lib/vfs')(tree);

'use strict';

var expect = require('chai').expect;

describe('fs kitchen sink', function() {
    describe('method fs.existsSync', function() {

        beforeEach(function() {

            if(true === tree.exists('/tmp/vfs-test')){
                tree.remove('/tmp/vfs-test');
            }

            tree.addDir('/tmp/vfs-test');
            tree.addDir('/tmp/vfs-test/exist');
            fs.addFile('/tmp/vfs-test/message.txt', 'Hello Node.js', 'utf8');
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
});


