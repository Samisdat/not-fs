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

Tree.prototype.getPathByInodeNumber = function(checkInodeNumber) {

    var parts = [];

    var tree = this;

    var dive = function(inodeNumber){

        if (true === tree.leafs[inodeNumber].isRoot()){
            parts.push('');
        }
        else {
            parts.push(tree.leafs[inodeNumber].getName());

            if (undefined !== tree.parent[inodeNumber]){
                dive(tree.parent[inodeNumber]);
            }

        }
    };

    dive(checkInodeNumber);

    return parts.reverse().join('/');

};


Tree.prototype.getLastInodeNumber = function(){

    return this.lastInodeNumber;

};

Tree.prototype.exists = function(checkPath){

    checkPath = this.resolveDir(checkPath);

    var inodeNumber = this.getInodeNumberByPath(checkPath);
    return (false === inodeNumber) ? false : true;

};

Tree.prototype.getNodeByPath = function(pathName){

    if (false === this.exists(pathName)){
        return false;
    }

    var inodeNumber = this.getInodeNumberByPath(pathName);

    return this.leafs[inodeNumber];

};

Tree.prototype.getChildrenByPath = function(pathName){

    pathName = this.resolveDir(pathName);

    if (false === this.exists(pathName)){
        return false;
    }

    if (false === this.isDirectory(pathName)){
        return false;
    }

    var inodeNumber = this.getInodeNumberByPath(pathName);

    var childrenInodeNumbers = this.tree[inodeNumber];

    var children = [];

    for (var i = 0, x = childrenInodeNumbers.length; i < x; i += 1) {

        var inodeNumber = childrenInodeNumbers[i];

        children.push(
            this.leafs[inodeNumber]
        );

        this.leafs[inodeNumber].getName();

    }

    return children;

};

Tree.prototype.getInodeNumberByPath = function(pathName){

    var parsePath = path.parse(pathName);

    if (parsePath.root === parsePath.dir && pathName === parsePath.dir){
        return 0;
    }

    var tree = this;

    var inodeNumberByPath = false;

    var climb = function(inodeNumber){

        if (pathName === tree.getPathByInodeNumber(inodeNumber)){
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

    return inodeNumberByPath;

};


Tree.prototype.createMissingDirs = function(dirPath){

    var parts = dirPath.split(path.sep);

    for (var i = 0, x = parts.length; i <= x; i += 1){
        var addMissingDir = parts.slice(0, i).join('/');

        if ('/' === addMissingDir){
            continue;
        }

        if ('' === addMissingDir){
            continue;
        }

        if (false === this.exists(addMissingDir)){
            this.addDir(addMissingDir, false);
        }

    }

};

Tree.prototype.resolveDir = function(pathName){

    if ('/' === pathName){
        return '/';
    }

    pathName = pathName.replace(/\/$/, '');

    pathName = path.normalize(pathName);

    if (false === path.isAbsolute(pathName)){

        //pathName = path.join(__dirname, pathName);

        throw new Error('Only absolute path supported');


    }

    return pathName;

};

Tree.prototype.addDir = function(dirPath, addMissingDirs){

    if ('' === dirPath.trim()){
        throw new Error('dirPath may not be empty');
    }

    addMissingDirs = (undefined === addMissingDirs) ? false : addMissingDirs;

    dirPath = this.resolveDir(dirPath);

    if (true === this.exists(dirPath)){
        return;
    }

    var parentDirPath = path.dirname(dirPath);

    if (false === this.exists(parentDirPath)){

        if (true !== addMissingDirs){
            throw new Error('can not create ' + dirPath + ' while parent ' + parentDirPath + ' is not existing');
        }
        this.createMissingDirs(parentDirPath);
    }

    var parentInodeNumber = this.getInodeNumberByPath(parentDirPath);

    var dir = new Dir(
        this.getInodeNumber(),
        path.basename(dirPath)
    );

    this.tree[parentInodeNumber].push(dir.getInodeNumber()); ;
    this.tree[dir.getInodeNumber()] = [];
    this.leafs[dir.getInodeNumber()] = dir;
    this.parent[dir.getInodeNumber()] = parentInodeNumber;

};

Tree.prototype.removeChildNode = function(inodeNumber){

    if (true !== this.hasChildren(inodeNumber)){
        return;
    }

    var children = this.getChildren(inodeNumber);

    var tree = this;
    children.forEach(function(child){
        tree.removeNode(child);
    });

};

Tree.prototype.removeChildFromLimb = function(parentInodeNumber, childInodeNumber){

    var children = [];

    for (var i = 0, x = this.tree[parentInodeNumber].length; i < x; i += 1){
        if (childInodeNumber === this.tree[parentInodeNumber][i]){
            continue;
        }
        children.push(this.tree[parentInodeNumber][i]);
    }

    this.tree[parentInodeNumber] = children;

};

Tree.prototype.removeNode = function(inodeNumber){

    var node = this.leafs[inodeNumber];

    if (true === node.isDirectory() && true === this.hasChildren(inodeNumber)){

        this.removeChildNode(inodeNumber);

    }

    var parentInodeNumber = this.parent[inodeNumber];

    // remove node form parent
    if (true === this.hasChildren(parentInodeNumber)){

        this.removeChildFromLimb(parentInodeNumber, inodeNumber);

    }

    delete this.leafs[inodeNumber];

    delete this.parent[inodeNumber];

    if (true === node.isDirectory()){
        delete this.tree[inodeNumber];
    }
};

Tree.prototype.isType = function(type, pathName){

    var method = false;
    if ('file' === type){
        method = 'isFile';
    }
    else if ('dir' === type){
        method = 'isDirectory';
    }

    if (false === method){
        throw new Error('unkown type');
    }

    if (false === this.exists(pathName)){
        return undefined;
    }

    var inodeNumber = this.getInodeNumberByPath(pathName);

    method = this.leafs[inodeNumber][method];

    return method();

};

Tree.prototype.isDirectory = function(pathName){

    return this.isType('dir', pathName);

};

Tree.prototype.isFile = function(pathName){

    return this.isType('file', pathName);

};

Tree.prototype.addFile = function(filePath, data, addMissingDirs){

    addMissingDirs = (undefined === addMissingDirs) ? false : addMissingDirs;

    addMissingDirs = true;

    var parentDirPath = path.dirname(filePath);

    if (false === this.exists(parentDirPath)){

        if (true !== addMissingDirs){
            throw new Error('can not create ' + dirPath + ' while parent ' + parentDirPath + ' is not existing');
        }
        this.createMissingDirs(parentDirPath);
    }

    var parentInodeNumber = this.getInodeNumberByPath(parentDirPath);

    var name = filePath.replace(parentDirPath + '/', '');

    var file = new File(
        this.getInodeNumber(),
        name,
        data
    );

    this.tree[parentInodeNumber].push(file.getInodeNumber()); ;
    this.leafs[file.getInodeNumber()] = file;
    this.parent[file.getInodeNumber()] = parentInodeNumber;

};

Tree.prototype.removeDir = function(dirPath){

    dirPath = this.resolveDir(dirPath);

    if (false === this.exists(dirPath)){
        return;
    }

    var inodeNumber = this.getInodeNumberByPath(dirPath);

    this.removeNode(inodeNumber);

};

Tree.prototype.removeFile = function(filePath){

    if (false === this.exists(filePath)){
        return;
    }

    var inodeNumber = this.getInodeNumberByPath(filePath);
    this.removeNode(inodeNumber);
};

Tree.prototype.remove = function(filePath){

    if (false === this.exists(filePath)){
        return;
    }

    var inodeNumber = this.getInodeNumberByPath(filePath);
    this.removeNode(inodeNumber);

};

Tree.prototype.rename = function(oldPath, newPath, addMissingDirs){

    addMissingDirs = (undefined === addMissingDirs) ? false : addMissingDirs;

    addMissingDirs = true;

    if (false === this.exists(oldPath)){
        return;
    }

    if (true === this.exists(newPath)){
        return;
    }

    var inodeNumber = this.getInodeNumberByPath(oldPath);
    var node = this.getNodeByPath(oldPath);


    var parentDirOfNewPath = path.dirname(newPath);

    if (false === this.exists(parentDirOfNewPath)){

        if (true !== addMissingDirs){
            throw new Error('can not create ' + newPath + ' while parent ' + parentDirOfNewPath + ' is not existing');
        }
        this.createMissingDirs(parentDirOfNewPath);
    }

    var parentInodeNumverOfOldPath = this.parent[inodeNumber];
    var parentInodeNumverOfNewPath = this.getInodeNumberByPath(parentDirOfNewPath);

    if (parentInodeNumverOfOldPath !== parentInodeNumverOfNewPath){

        this.parent[inodeNumber] = parentInodeNumverOfNewPath;

        this.removeChildFromLimb(parentInodeNumverOfOldPath, inodeNumber);

        this.tree[parentInodeNumverOfNewPath].push(inodeNumber);

    }

    var name = newPath.replace(parentDirOfNewPath, '').replace(/^\//, '');

    node.setName(name);

};


/* istanbul ignore next */
Tree.prototype.hasChildren = function(inodeNumber){

    if (undefined !== this.tree[inodeNumber] && 0 < this.tree[inodeNumber].length){
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
        if (0 < depth){
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
