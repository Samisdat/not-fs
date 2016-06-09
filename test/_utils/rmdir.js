'use strict';

var fs = require('fs');
var path = require('path');

/**
 * https://gist.github.com/tkihira/2367067
 */

var rmdirSync = function(dir) {

    var list = fs.readdirSync(dir);
    list = list.reverse();

    for (var i = 0, x = list.length; i < x; i++) {

        var filename = path.join(dir, list[i]);
    
        if(true === fs.existsSync(filename)){
            var stat = fs.statSync(filename);

            if (stat.isDirectory()) {

                rmdirSync(filename);

            } else {

                fs.unlinkSync(filename);

            }

        }

    }

    fs.rmdirSync(dir);

};

module.exports = rmdirSync;
