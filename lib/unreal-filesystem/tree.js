'use strict';

var path = require('path');

var Root = require('./root');
var Dir = require('./dir');
var File = require('./file');

var Tree = function(){

    this.tree = {};
    this.leafs = {};
    this.parent = {};

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

Tree.prototype.getPathByInodeNumber = function(inodeNumber) {

    var parts = [];

    var tree = this;
    var dive = function(inodeNumber){

        if(true === tree.leafs[inodeNumber].isRoot()){
            parts.push('');   
        }
        else{
            parts.push(tree.leafs[inodeNumber].getName());

            if(undefined !== tree.parent[inodeNumber]){
                dive(tree.parent[inodeNumber]);
            }

        }
    };

    dive(inodeNumber)

    return parts.reverse().join('/');

};


Tree.prototype.getLastInodeNumber = function(){

    return this.lastInodeNumber;

};

Tree.prototype.exists = function(checkPath){

    var inodeNumber = this.getInodeNumberByPath(checkPath);
    return (false === inodeNumber) ? false : true;

};

Tree.prototype.getInodeNumberByPath = function(pathName){

    var parsePath = path.parse(pathName);

    if(parsePath.root === parsePath.dir && pathName === parsePath.dir){
        return 0;
    }

    var parts = pathName.split(path.sep);

    var tree = this;

    var inodeNumberByPath = false;

    var climb = function(inodeNumber){

        if(pathName === tree.getPathByInodeNumber(inodeNumber)){
            inodeNumberByPath = inodeNumber;
            return;
        }

        if (false !== tree.hasChildren(inodeNumber)){

            var children = tree.getChildren(inodeNumber);
            //@TODO lastIndex SchnellTest
            children.forEach(function(child){
                climb(child);
            });

        }
    };

    climb(0, 0);

    //console.log('inodeNumberByPath', inodeNumberByPath)

    return inodeNumberByPath;

};


Tree.prototype.createMissingDirs = function(dirPath){

    console.log('createMissingDirs', dirPath);

    var parts = dirPath.split(path.sep);

    for(var i = 0, x = parts.length; i <= x; i += 1){
        var addMissingDir = parts.slice(0, i).join('/');
        if(false === this.exists(addMissingDir)){
            this.addDir(addMissingDir, false);  
        }

    }

}

Tree.prototype.resolveDir = function(pathName){

    pathName = pathName.replace(/\/$/, '');

    pathName = path.normalize(pathName);

    if(false === path.isAbsolute(pathName)){

        pathName = path.join(__dirname, pathName);

    }

    return pathName;    

};

Tree.prototype.addDir = function(dirPath, addMissingDirs){

    addMissingDirs = (undefined === addMissingDirs) ? false : addMissingDirs;

    addMissingDirs = true;

    dirPath = this.resolveDir(dirPath);

    if(true === this.exists(dirPath)){
        return;
    }

    var parentDirPath = path.dirname(dirPath);

    if(false === this.exists(parentDirPath)){

        if(true !== addMissingDirs){
            throw new Error('can not create ' + dirPath + ' while parent ' + parentDirPath + ' is not existing');
        }
        this.createMissingDirs(parentDirPath);
    }
    
    var parentInodeNumber = this.getInodeNumberByPath(parentDirPath);
        
    var dir = new Dir(
        this.getInodeNumber(),
        path.basename(dirPath),
        parentInodeNumber
    );

    this.tree[parentInodeNumber].push(dir.getInodeNumber());; 
    this.tree[dir.getInodeNumber()] = []; 
    this.leafs[dir.getInodeNumber()] = dir; 
    this.parent[dir.getInodeNumber()] = parentInodeNumber;

};



Tree.prototype.addFile = function(filePath, data){

    var parentDirPath = path.dirname(filePath);
    console.log(parentDirPath);

    return;

    var file = new File(
        this.getInodeNumber(),
        name, 
        parent
    );
    console.log(file);
    return file;

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

        var tab = Array(depth).join('   ');

        var msg = '';
        if(0 < depth){
            msg += tab + '└── ';    
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
