'use strict';

var Stats = require('./stats');
var Permission = require('./permission');

var Node = function(inodeNumber, name, options) {

    if (undefined === options){
        options = {};
    }

    this.inodenumber = inodeNumber;

    this.uid = 0;
    this.gid = 0;

    //@TODO should there be an default?
    if (undefined === options.mode){
        options.mode = '0755';
    }

    this.setPermission(options.mode);

    this.setName(name);

    if (undefined === options.stats){

        options.stats = {};

    }

    this.stats = new Stats(this, options.stats);

};

Node.prototype.getInodeNumber = function(){

    return this.inodenumber;

};

Node.prototype.getPermission = function(){

    return this.permission;

};

Node.prototype.setPermission = function(mode){

    this.permission = new Permission(mode);

};

Node.prototype.getName = function(){

    return this.name;

};

Node.prototype.setName = function(name){

    this.name = name;

};

Node.prototype.isRoot = function(){

    return false;

};

Node.prototype.isFile = function(){

    return undefined;

};

Node.prototype.isDir = function(){

    return undefined;

};

Node.prototype.getStats = function(){

    return this.stats;

};

module.exports = Node;
