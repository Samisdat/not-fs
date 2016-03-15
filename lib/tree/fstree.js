'use strict';

var uuid = require('node-uuid');
var Node = require('./node');

var Dir = require('../vfs/dir');
var File = require('../vfs/file');

var getParts = function(path){
    var absolutePath = /^\//.test(path);

    if(false === absolutePath){
        throw new Error('Only absolute path supported');
    }

    path = path.replace(/^\//, '');
    path = path.replace(/\/$/, '');
    var parts = path.split('/');
    return parts;
};

var FsTree = function() {

    var id = uuid.v4();
    var root = new Node(id, 'vfs');
    this.root = root; 
    this.root.setRoot();

};

FsTree.prototype.climbDepthDirst = function(callback) {
 
    var depth = 0;

    var climb = function(harvest){

        var children = harvest.getChildren();

        children.forEach(function(child){
            climb(child);
        });        

        callback(harvest);

    };

    climb(this.root) 
};

FsTree.prototype.exists = function(path){

    var exists = false;

    this.climbDepthDirst(function(child){
        if(path === child.getFqn()){
            exists = true;
        }
    });

    return exists;

};

FsTree.prototype.addDir = function(path){

    var parts = getParts(path);

    var growingParts = [];
    var depth = 0;
    
    for(var depth = 0, length = parts.length; depth < length; depth += 1 ){
        growingParts.push('/' + parts.slice(0, (depth + 1)).join('/'));
    }

    var that = this;
    var parent = this.root;
    growingParts.forEach(function(part){
        var exists = that.exists(part);
        if(false === exists){
            var id = uuid.v4();
            var create = new Node(id, part.split('/').pop(), parent);
            parent = create;
        }
    });
};

FsTree.prototype.isDir = function(path){

    var parts = getParts(path);
    parts = parts[0];

    console.log(parts)


};

FsTree.prototype.log = function(){


    var climb = function(harvest){
        var tab = Array(harvest.getDepth() + 1).join('   ');

        console.log(tab + '└── ' + harvest.getName())
        
        var children = harvest.getChildren();

        children.forEach(function(child){
            climb(child);
        });        

    };

    climb(this.root) 
};


module.exports = FsTree;
