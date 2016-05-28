'use strict';

var Node = require('./node');

var extend = require('util')._extend;

var File = function(name, parent, content, options) {

    if (undefined === options){
        options = {};
    }

    if (undefined === content){
        content = '';
    }

    this.content = content;

    options.mode = '0644';

    options.stats = extend({
        _isFile: true,
    }, options.stats);

    Node.call(this, name, parent, options);

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

    this.getStats().atime = new Date();
    return this.content;

};

File.prototype.setContent = function(content){

    if ( undefined === content){
        content = '';
    }

    this.getStats().atime = new Date();
    this.getStats().mtime = new Date();
    this.getStats().size = content.length;

    this.content = content;

};


module.exports = File;
