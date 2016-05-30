'use strict';

var path = require('path');

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

    this.tree[root.getInodeNumber()] = [];
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

Tree.prototype.exists = function(checkPath){

    return;

};

Tree.prototype.getInodeNumberByPath = function(pathName){

    var parsePath = path.parse(pathName);

    if(parsePath.root === parsePath.dir && pathName === parsePath.dir){
        return 0;
    }
};
Tree.prototype.addDir = function(dirPath){
    
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

/* istanbul ignore next */
Tree.prototype.hasChildren = function(inodeNumber){

    if(undefined !== this.tree[inodeNumber] && 0 < this.tree[inodeNumber].length){
        return true;
    }
    return false;
};

Tree.prototype.getChildren = function(inodeNumber){
    return this.tree[inodeNumber];
};


/* istanbul ignore next */
Tree.prototype.log = function(){

    var tree = this;

    var climb = function(inodeNumber, depth){

        var tab = Array(depth + 1).join('   ');

        var msg = '';
        if(0 < depth){
            msg += '└── ';    
        }

        msg += tree.leafs[inodeNumber].getName();    

        console.log(msg);    

        if (undefined !== tree.hasChildren(inodeNumber)){

            var children = tree.getChildren(inodeNumber);

            children.forEach(function(child){
                climb(child, (depth + 1));
            });

        }

    };

    climb(0, 0);
};


module.exports = Tree;
