'use strict';

var Stats = require('./stats');
var Permission = require('./permission');

var Node = function(inodeNumber, name, parent, options) {

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

    this.name = name;

    this.parent = parent;

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

Node.prototype.isRoot = function(){

    return false;

};

Node.prototype.isFile = function(){

    return undefined;

};

Node.prototype.isDir = function(){

    return undefined;

};

Node.prototype.getFqn = function(){

    if (true === this.isRoot()){
        return false;
    }

    if (undefined === this.getParent()){
        return false;
    }

    var fqn = [];

    var dive = function(node){

        if (true !== node.isRoot()){
            fqn.push(node.getName());
            dive(node.getParent());
        }

    };

    dive(this);

    return '/' + fqn.reverse().join('/');
};

Node.prototype.getDepth = function(){

    var depth = 0;

    var dive = function(node){

        if (true !== node.isRoot()){

            depth += 1;
            dive(node.getParent());

        }
    };

    dive(this);

    return depth;

};

Node.prototype.getParent = function(){

    return this.parent;

};

Node.prototype.setParent = function(parent){

    this.parent = parent;

};

Node.prototype.getStats = function(){

    return this.stats;

};

module.exports = Node;
