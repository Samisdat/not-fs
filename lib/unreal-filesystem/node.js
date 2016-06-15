'use strict';

var statsGenerator = require('./stats');
var Permission = require('./permission');

var Node = function(inodeNumber, name, options) {

    if (undefined === options){
        options = {};
    }

    this.inodenumber = inodeNumber;

    this.uid = 0;
    this.gid = 0;

    //@TODO should there be an default?
    if (undefined === options.mode){
        options.mode = '0755';
    }

    this.setPermission(options.mode);

    this.setName(name);

    if (undefined === options.stats){

        options.stats = {};

    }

    this.stats = statsGenerator(this);

};

Node.prototype.getInodeNumber = function(){

    return this.inodenumber;

};

Node.prototype.getPermission = function(){

    return this.permission;

};

Node.prototype.setPermission = function(mode){

    this.permission = new Permission(mode);

};

Node.prototype.getName = function(){

    return this.name;

};

Node.prototype.setName = function(name){

    this.name = name;

};

Node.prototype.isRoot = function(){

    return false;

};

Node.prototype.isFile = function(){

    return undefined;

};

Node.prototype.isDirectory = function(){

    return undefined;

};

Node.prototype.isBlockDevice = function(){

    return false;

};

Node.prototype.isCharacterDevice = function(){

    return false;

};

Node.prototype.isSymbolicLink = function(){

    return false;

};

Node.prototype.isFIFO = function(){

    return false;

};

Node.prototype.isSocket = function(){

    return false;

};


Node.prototype.getStats = function(){

    return this.stats;

};

Node.prototype.isOwner = function(userId){

    if(undefined === userId){
        userId = process.getuid()
    }

    return userId === this.uid;
};

Node.prototype.isInOwnerGroup = function(groupId){

    if(undefined === groupId){
        groupId = process.getgid();
    }

    return groupId === this.gid;

};

Node.prototype.isReadable = function(userId, groupId){

    return this.permission.isReadable(
        this.isOwner(userId),
        this.isInOwnerGroup(groupId)
    );

};

Node.prototype.isWritable = function(userId, groupId){

    return this.permission.isWritable(
        this.isOwner(userId),
        this.isInOwnerGroup(groupId)
    );

};

Node.prototype.isExecutable = function(userId, groupId){

    return this.permission.isExecutable(
        this.isOwner(userId),
        this.isInOwnerGroup(groupId)
    );

};

module.exports = Node;
