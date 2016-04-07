'use strict';

var innodeNumber = require('./inode-number');
var Stats = require('./stats');

var Node = function(name, parent, options) {

    this.inodenumber = innodeNumber();

    this.name = name;
    this.parent = parent;

    if (undefined !== parent){

        parent.addChild(this);

    }

    this.stats = new Stats(this);

};

Node.prototype.getInodeNumber = function(){

    return this.inodenumber;

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
