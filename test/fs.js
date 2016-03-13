'use strict';

var expect = require('chai').expect;

var fs = require('fs');

describe('method qfs.fileExists', function() {

    beforeEach(function() {
    });

    it('file exist tmp', function() {

        var promise = fs.existsSync('/tmp');

        console.log(promise);

    });

});

