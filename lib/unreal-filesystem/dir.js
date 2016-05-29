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

    this.children = [];

};

Dir.prototype = Object.create(Node.prototype);
Dir.prototype.constructor = Dir;

Dir.prototype.isFile = function(){

    return false;

};

Dir.prototype.isDir = function(){

    return true;

};

Dir.prototype.getChildren = function(){

    return this.children;

};

Dir.prototype.addChild = function(newChild){

    var node = this;

    this.children.forEach(function(existingChild){

        if (existingChild.getName() === newChild.getName()){
            throw new Error('node[uuid=' + node.getName() + '] has already a child[name=' + newChild.getName() + ']');
        }

    });

    newChild.setParent(this);
    this.children.push(newChild);

};

Dir.prototype.hasChild = function(name){

    var has = false;

    var children = this.getChildren();
    children.forEach(function(child){
        if (name === child.getName()){
            has = true;
        }
    });

    return has;

};

Dir.prototype.removeChild = function(child){

    var removeIndex = false;

    this.children.forEach(function(elem, index){

        if (elem.getInodeNumber() === child.getInodeNumber()){
            removeIndex = index;
        }

    });

    if (false === removeIndex){

        throw new Error(child.getInodeNumber() + ' is not a child of ' + this.getInodeNumber());

    }

    var children = [];

    this.children.forEach(function(elem){

        if (elem.getInodeNumber() !== child.getInodeNumber()){
            children.push(elem);
        }

    });

    this.children = children;

};


module.exports = Dir;
