'use strict';

var Dir = require('./dir');

var Root = function() {

    Dir.call(this, 'unreal-root');

};

Root.prototype = Object.create(Dir.prototype);
Root.prototype.constructor = Dir;

Root.prototype.isRoot = function(){

    return true;

};

module.exports = Root;
