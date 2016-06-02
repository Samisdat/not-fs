'use strict';

var extend = require('util')._extend;

var Node = require('./node');

var Dir = function(inodeNumber, name, parent, options) {

    if (undefined === options){
        options = {};
    }

    options.mode = '0755';

    options.stats = extend({
        size: 4096
    }, options.stats);

    Node.call(this, inodeNumber, name, parent, options);

};

Dir.prototype = Object.create(Node.prototype);
Dir.prototype.constructor = Dir;

Dir.prototype.isFile = function(){

    return false;

};

Dir.prototype.isDir = function(){

    return true;

};

module.exports = Dir;
