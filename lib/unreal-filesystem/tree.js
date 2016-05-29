'use strict';

var Root = require('./root');
var Dir = require('./dir');
var File = require('./file');

var Tree = function(){

    this.tree = {};
    this.leafs = {};

    this.inodeNumber = 0;
    this.lastInodeNumber = 0;

    var root = new Root(
        this.getInodeNumber()
    );

    this.tree[root.getInodeNumber()] = {};
    this.leafs[root.getInodeNumber()] = root; 

};

Tree.prototype.getInodeNumber = function() {

    this.lastInodeNumber = this.inodeNumber;
    this.inodeNumber += 1;
    return this.lastInodeNumber;

};

Tree.prototype.getLastInodeNumber = function(){

    return this.lastInodeNumber;
    
};

Tree.prototype.addFile = function(path, data){

    if (true === this.exists(path)){

        return undefined;

    }

    var parts = this.getParts(path);

    var parent = this.root;

    if (1 < parts.length){

        var dir = '/' + parts.slice(0, -1).join('/');

        if (false === this.exists(dir)){
            this.addDir(dir);
        }

        parent = this.getByFqn(dir);

    }

    var name = parts.pop();

    var file = new File(name, parent);
    file.setContent(data);

    return file;

};



module.exports = Tree;
