'use strict';

var Dir = require('./dir');

var Root = function(inodeNumber) {

    Dir.call(this, inodeNumber, '/');

};

Root.prototype = Object.create(Dir.prototype);
Root.prototype.constructor = Dir;

Root.prototype.isRoot = function(){

    return true;

};

module.exports = Root;
