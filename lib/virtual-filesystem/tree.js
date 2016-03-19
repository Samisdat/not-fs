'use strict';

var Root = require('./root');
var Dir = require('./dir');
var File = require('./file');

var FsTree = function() {

    this.root = new Root();

};

FsTree.prototype.getParts = function(path){

    var absolutePath = /^\//.test(path);

    if (false === absolutePath){
        throw new Error('Only absolute path supported');
    }

    path = path.replace(/^\//, '');
    path = path.replace(/\/$/, '');

    var parts = path.split('/');
    return parts;

};


FsTree.prototype.climbDepthDirst = function(callback) {

    var climb = function(harvest){

        if (false === harvest.isFile()){

            var children = harvest.getChildren();

            children.forEach(function(child){
                climb(child);
            });

        }

        callback(harvest);

    };

    climb(this.root);

};

FsTree.prototype.exists = function(path){

    var exists = false;

    // remove traling slash
    path = path.replace(/\/$/, '');

    this.climbDepthDirst(function(child){
        if (path === child.getFqn()){
            exists = true;
        }
    });

    return exists;

};

FsTree.prototype.getByFqn = function(path){

    if (false === this.exists(path)){
        return false;
    }

    var node = false;

    this.climbDepthDirst(function(child){

        if (path === child.getFqn()){
            node = child;
        }

    });

    return node;

};


FsTree.prototype.addDir = function(path){

    if (true === this.exists(path)){

        return undefined;

    }

    var parts = this.getParts(path);

    var growingParts = [];
    var depth = 0;

    for (var depth = 0, length = parts.length; depth < length; depth += 1 ){

        growingParts.push('/' + parts.slice(0, (depth + 1)).join('/'));

    }

    var parent = this.root;
    var that = this;

    growingParts.forEach(function(part){

        var exists = that.exists(part);

        if (false === exists){

            var create = new Dir(part.split('/').pop(), parent);
            parent = create;

        }
        else {

            parent = that.getByFqn(part);

        }

    });

    return this.getByFqn('path');

};

FsTree.prototype.addFile = function(path, data){

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

    return file;

};

FsTree.prototype.remove = function(path){
    
    if (false === this.exists(path)){

        return undefined;

    }

    var node = this.getByFqn(path);
    var parent = node.getParent();
    parent.removeChild(node);

    return true;

};


FsTree.prototype.isDir = function(path){

    if (false === this.exists(path)){
        return undefined;
    }

    return this.getByFqn(path).isDir();

};

FsTree.prototype.isFile = function(path){

    if (false === this.exists(path)){
        return undefined;
    }

    return this.getByFqn(path).isFile();

};

/* istanbul ignore next */
FsTree.prototype.log = function(){

    var climb = function(harvest){

        var tab = Array(harvest.getDepth() + 1).join('   ');

        console.log(tab + '└── ' + harvest.getName());

        var children = harvest.getChildren();

        children.forEach(function(child){
            climb(child);
        });

    };

    climb(this.root);
};


module.exports = FsTree;
