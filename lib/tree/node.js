'use strict';

var Node = function(uuid, name, parent) {
    this.uuid = uuid;
    this.name = name;
    this.parent = parent;
    this.children = [];
};

Node.prototype.getUuid = function(){
    return this.uuid;
};

Node.prototype.getName = function(){
    return this.name;
};

Node.prototype.getParent = function(){
    return this.parent;
};

Node.prototype.setParent = function(parent){
    this.parent = parent;
};

Node.prototype.getChildren = function(){
    return this.children;
};

Node.prototype.addChild = function(child){
    child.setParent(this);
    this.children.push(child);
};

Node.prototype.removeChild = function(child){

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

module.exports = Node;
