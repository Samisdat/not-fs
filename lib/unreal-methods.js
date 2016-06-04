'use strict';

var unrealFs = {};

var tree;

unrealFs.getTree = function(){
    return tree;
};

unrealFs.setTree = function(paramTree){
    tree = paramTree;
};

var forceStack = {};


unrealFs.setForce = function(method, returnOrCallback){

    if (undefined === forceStack[method]){
        forceStack[method] = [];
    }
    forceStack[method].push(returnOrCallback);

};


unrealFs.clearForce = function(method){

    forceStack[method] = [];

};


unrealFs.hasForce = function(method){

    if (undefined === forceStack[method]){
        return false;
    }

    return ( 0 < forceStack[method].length);

};

unrealFs.doForce = function(method){

    if (undefined === forceStack[method]){
        return undefined;
    }

    method = forceStack[method].shift();

    return method(unrealFs);

};



unrealFs.access = function(path, mode, callback){
    console.log('access', arguments);
};

unrealFs.accessSync = function(path, mode){
    console.log('accessSync', arguments);
};

unrealFs.appendFile = function(file, data, options, callback){

    unrealFs.appendFileSync(file, data, options);

    callbackParam = null;

    if (true === unrealFs.hasForce('appendFile')){
        callbackParam = unrealFs.doForce('appendFile');
    }

    process.nextTick(function () {
        callback(callbackParam);
    });

};

unrealFs.appendFileSync = function(file, data, options){

    if (false === tree.exists(file)){
        tree.addFile(file);
    }

    var content = tree.getByFqn(file).getContent();

    tree.getByFqn(file).setContent(content + data);

};

unrealFs.chmod = function(path, mode, callback){
    console.log('chmod', arguments);
};

unrealFs.chmodSync = function(path, mode){
    console.log('chmodSync', arguments);
};

unrealFs.chown = function(path, uid, gid, callback){
    console.log('chown', arguments);
};

unrealFs.chownSync = function(path, uid, gid){
    console.log('chownSync', arguments);
};

unrealFs.close = function(fd, callback){
    console.log('close', arguments);
};

unrealFs.closeSync = function(fd){
    console.log('closeSync', arguments);
};

unrealFs.createReadStream = function(path, options){
    console.log('createReadStream', arguments);
};

unrealFs.createWriteStream = function(path, options){
    console.log('createWriteStream', arguments);
};

unrealFs.exists = function(path, callback){
    var exists = tree.exists(path);

    process.nextTick(function () {
        callback(exists);
    });

};

unrealFs.existsSync = function(path){
    return tree.exists(path);
};

unrealFs.fchmod = function(fd, mode, callback){
    console.log('fchmod', arguments);
};

unrealFs.fchmodSync = function(fd, mode){
    console.log('fchmodSync', arguments);
};

unrealFs.fchown = function(fd, uid, gid, callback){
    console.log('fchown', arguments);
};

unrealFs.fchownSync = function(fd, uid, gid){
    console.log('fchownSync', arguments);
};

unrealFs.fdatasync = function(fd, callback){
    console.log('fdatasync', arguments);
};

unrealFs.fdatasyncSync = function(fd){
    console.log('fdatasyncSync', arguments);
};

unrealFs.fstat = function(fd, callback){
    console.log('fstat', arguments);
};

unrealFs.fstatSync = function(fd){
    console.log('fstatSync', arguments);
};

unrealFs.fsync = function(fd, callback){
    console.log('fsync', arguments);
};

unrealFs.fsyncSync = function(fd){
    console.log('fsyncSync', arguments);
};

unrealFs.ftruncate = function(fd, len, callback){
    console.log('ftruncate', arguments);
};

unrealFs.ftruncateSync = function(fd, len){
    console.log('ftruncateSync', arguments);
};

unrealFs.futimes = function(fd, atime, mtime, callback){
    console.log('futimes', arguments);
};

unrealFs.futimesSync = function(fd, atime, mtime){
    console.log('futimesSync', arguments);
};

unrealFs.lchmod = function(path, mode, callback){
    console.log('lchmod', arguments);
};

unrealFs.lchmodSync = function(path, mode){
    console.log('lchmodSync', arguments);
};

unrealFs.lchown = function(path, uid, gid, callback){
    console.log('lchown', arguments);
};

unrealFs.lchownSync = function(path, uid, gid){
    console.log('lchownSync', arguments);
};

unrealFs.link = function(srcpath, dstpath, callback){
    console.log('link', arguments);
};

unrealFs.linkSync = function(srcpath, dstpath){
    console.log('linkSync', arguments);
};

unrealFs.lstat = function(path, callback){
    console.log('lstat', arguments);
};

unrealFs.lstatSync = function(path){
    console.log('lstatSync', arguments);
};

unrealFs.mkdir = function(path, mode, callback){

    if (undefined === callback){
        callback = mode;
        mode = '0755';
    }

    callbackParam = null;

    if (true === unrealFs.hasForce('mkdir')){
        callbackParam = unrealFs.doForce('mkdir');
    }

    unrealFs.mkdirSync(path, mode);

    process.nextTick(function () {
        callback(callbackParam);
    });

};

unrealFs.mkdirSync = function(path, mode){

    var alreadyExists = tree.exists(path);

    if (true === alreadyExists){
        throw new Error('EEXIST, file already exists \'' + path + '\'');
    }

    tree.addDir(path);
};

unrealFs.open = function(path, flags, mode, callback){
    console.log('open', arguments);
};

unrealFs.openSync = function(path, flags, mode){
    console.log('openSync', arguments);
};

unrealFs.read = function(fd, buffer, offset, length, position, callback){
    console.log('read', arguments);
};

unrealFs.readdir = function(path, callback){

    var error = null;
    var files = null;

    try {
        var files = unrealFs.readdirSync(path);
    }
    catch (e){
        error = e;
    }

    process.nextTick(function () {
        callback(error, files);
    });

};

unrealFs.readdirSync = function(path){
    if (false === tree.exists(path)){
        throw new Error('ENOENT: no such file or directory, scandir \'' + path + '\'');
    }

    var chilren = tree.getChildrenByPath(path);

    var childrenNames = [];
    chilren.forEach(function(child){
        childrenNames.push(child.getName());
    });

    return childrenNames;
};

unrealFs.readFile = function(file, options, callback){
    var error = null;

    try {
        var content = unrealFs.readFileSync(file);
    }
    catch (e){
        error = e.message;
    }

    process.nextTick(function () {
        callback(error, content);
    });
};

unrealFs.readFileSync = function(file, options){

    if (false === tree.exists(file)){
        throw new Error('Error: ENOENT, no such file or directory \'' + file + '\'');
    }
    return tree.getByFqn(file).getContent();
};

unrealFs.readlink = function(path, callback){
    console.log('readlink', arguments);
};

unrealFs.readlinkSync = function(path){
    console.log('readlinkSync', arguments);
};

unrealFs.realpath = function(path, cache, callback){
    console.log('realpath', arguments);
};

unrealFs.readSync = function(fd, buffer, offset, length, position){
    console.log('readSync', arguments);
};

unrealFs.realpathSync = function(path, cache){
    console.log('realpathSync', arguments);
};

unrealFs.rename = function(oldPath, newPath, callback){
    unrealFs.renameSync(oldPath, newPath);

    var callbackParam = null;

    if (true === unrealFs.hasForce('rename')){
        callbackParam = unrealFs.doForce('rename');
    }

    process.nextTick(function () {
        callback(callbackParam);
    });
};

//@TODO implement a real rename by seperating items from tree
unrealFs.renameSync = function(oldPath, newPath){

    if (false === tree.exists(oldPath)){
        throw new Error(oldPath + ' does not exists.');
    }

    var node = tree.getByFqn(oldPath);

    tree.remove(oldPath);

    if (true === node.isDir()){
        tree.addDir(newPath);
    }
    else if (true === node.isFile()){
        unrealFs.writeFileSync(newPath, node.getContent, {encoding: 'UTF-8'});
    }

};

unrealFs.rmdir = function(path, callback){
    console.log('rmdir', arguments);
};

unrealFs.rmdirSync = function(path){
    tree.remove(path);
};

unrealFs.stat = function(path, callback){
    console.log('stat', arguments);
};

unrealFs.statSync = function(path){
    var node = tree.getNodeByPath(path);
    return node.getStats();
};

unrealFs.symlink = function(target, path, type, callback){
    console.log('symlink', arguments);
};

unrealFs.symlinkSync = function(target, path, type){
    console.log('symlinkSync', arguments);
};

unrealFs.truncate = function(path, len, callback){
    console.log('truncate', arguments);
};

unrealFs.truncateSync = function(path, len){
    console.log('truncateSync', arguments);
};

unrealFs.unlink = function(path, callback){

    tree.remove(path);

    callbackParam = null;

    if (true === unrealFs.hasForce('unlink')){
        callbackParam = unrealFs.doForce('unlink');
    }

    process.nextTick(function () {
        callback(callbackParam);
    });
};

unrealFs.unlinkSync = function(path){
    tree.remove(path);
    return null;
};

unrealFs.unwatchFile = function(filename, listener){
    console.log('unwatchFile', arguments);
};

unrealFs.utimes = function(path, atime, mtime, callback){
    console.log('utimes', arguments);
};

unrealFs.utimesSync = function(path, atime, mtime){
    console.log('utimesSync', arguments);
};

unrealFs.watch = function(filename, options, listener){
    console.log('watch', arguments);
};

unrealFs.watchFile = function(filename, options, listener){
    console.log('watchFile', arguments);
};

/**
 * @TODO param options is optional
 * @TODO add errors to callback
 */
unrealFs.writeFile = function(file, data, options, callback){

    unrealFs.writeFileSync(file, data, options);

    var callbackParam = null;

    if (true === unrealFs.hasForce('writeFile')){
        callbackParam = unrealFs.doForce('writeFile');
    }

    process.nextTick(function () {
        callback(callbackParam);
    });

};

/**
 * @TODO param options is optional
 */
unrealFs.writeFileSync = function(file, data, options){
    if (false === tree.exists(file)){
        tree.addFile(file);
    }

    tree.getNodeByPath(file).setContent(data);

};

module.exports = unrealFs;

