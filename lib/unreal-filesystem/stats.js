'use strict';

var options = require('./options');

var statsGenerator = function(node) {

    var permission = node.permission;

    var stats = {
        dev: options.getStatsDev(),
        mode: node.permission.getMode(),
        nlink: 1,
        uid: options.getStatsUid(),
        gid: options.getStatsGid(),
        rdev: options.getStatsRdev(),
        blksize: options.getStatsBlksize(),
        ino: node.getInodeNumber(),
        size: 0,
        blocks: 0,
        atime: new Date(),
        mtime: new Date(),
        ctime: new Date(),
        birthtime: new Date()
    };    

    Object.seal(stats);

    var isDirectory = node.isDirectory();
    var isFile =  node.isFile();
    var isBlockDevice =  node.isBlockDevice();
    var isCharacterDevice =  node.isCharacterDevice();
    var isSymbolicLink =  node.isSymbolicLink();
    var isFIFO =  node.isFIFO();
    var isSocket =  node.isSocket();

    return{
        get dev(){
            return stats.dev;
        },
        set dev(dev){
            stats.dev = dev
        },
        get mode(){
            return node.permission.getMode();
        },
        get nlink(){
            return stats.nlink;
        },
        set nlink(nlink){
            stats.nlink = nlink
        },
        get uid(){
            return stats.uid;
        },
        set uid(uid){
            stats.uid = uid
        },
        get gid(){
            return stats.gid;
        },
        set gid(gid){
            stats.gid = gid
        },
        get rdev(){
            return stats.rdev;
        },
        set rdev(rdev){
            stats.rdev = rdev
        },
        get blksize(){
            return stats.blksize;
        },
        set blksize(blksize){
            stats.blksize = blksize
        },
        get ino(){
            return stats.ino;
        },
        get size(){
            return stats.size;
        },
        set size(size){
            stats.size = size
        },
        get blocks(){
            return stats.blocks;
        },
        set blocks(blocks){
            stats.blocks = blocks
        },
        get atime(){
            return stats.atime;
        },
        set atime(atime){
            stats.atime = atime
        },
        get mtime(){
            return stats.mtime;
        },
        set mtime(mtime){
            stats.mtime = mtime
        },
        get ctime(){
            return stats.ctime;
        },
        set ctime(ctime){
            stats.ctime = ctime
        },
        get birthtime(){
            return stats.birthtime;
        },
        set birthtime(birthtime){
            stats.birthtime = birthtime
        },
        toString: function(){
            return 1234;
        },
        isDirectory: function() {
            return isDirectory;
        },
        isFile: function() {
            return isFile;
        },
        isBlockDevice: function() {
            return isBlockDevice;
        },
        isCharacterDevice: function() {
            return isCharacterDevice;
        },
        isSymbolicLink: function() {
            return isSymbolicLink;
        },
        isFIFO: function() {
            return isFIFO;
        },
        isSocket: function() {
            return isSocket;
        }
    }

};


module.exports = statsGenerator;

