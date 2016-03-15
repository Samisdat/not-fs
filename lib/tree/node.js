'use strict';

var Node = function(uuid, name, parent) {
    this.uuid = uuid;
    this.name = name;
    this.parent = parent;

    this.root = false;

    if(undefined !== parent){
        parent.addChild(this);    
    }
    
    this.children = [];
};

Node.prototype.isRoot = function(){
    return this.root;
};

Node.prototype.setRoot = function(){
    this.root = true;
};


Node.prototype.getUuid = function(){
    return this.uuid;
};

Node.prototype.getName = function(){
    return this.name;
};

Node.prototype.getFqn = function(){

    if(true === this.isRoot()){
        return false;
    }

    if(undefined === this.getParent()){
        return false;
    }

    var fqn = [];

    var dive = function(node){
        if(true !== node.isRoot()){
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
        if(true !== node.isRoot()){
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

Node.prototype.getChildren = function(){
    return this.children;
};

Node.prototype.addChild = function(child){
    child.setParent(this);
    this.children.push(child);
};

Node.prototype.hasChild = function(name){
    var has = false;

    var children = this.getChildren();
    children.forEach(function(child){
        if(name === child.getName()){
            has = true;
        }
    });
    
    return has;
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
