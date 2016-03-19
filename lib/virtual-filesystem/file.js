'use strict';

var Node = require('./node');

var File = function(name, parent) {

    Node.call(this, name, parent);

    this.content = '';

};

File.prototype = Object.create(Node.prototype);
File.prototype.constructor = File;


File.prototype.isFile = function(){

    return true;

};

File.prototype.isDir = function(){

    return false;

};

File.prototype.getContent = function(){

    return this.content;

};

File.prototype.setContent = function(content){

	this.content = content;

};


module.exports = File;
