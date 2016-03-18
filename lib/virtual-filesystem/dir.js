'use strict';

var Node = require('./node');

var Dir = function(name, parent) {

    Node.call(this, name, parent);

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
            throw new Error('node[uuid=' + node.getUuid() + '] has already a child[name=' + newChild.getName() + ']');
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

        if (elem.getUuid() === child.getUuid()){
            removeIndex = index;
        }

    });

    if (false === removeIndex){

        throw new Error(child.getUuid() + ' is not a child of ' + this.getUuid());

    }

    var children = [];

    this.children.forEach(function(elem){

        if (elem.getUuid() !== child.getUuid()){
            children.push(elem);
        }

    });

    this.children = children;

};


module.exports = Dir;
