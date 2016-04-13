var notFs = {};

var notFsTree;

notFs.getTree = function(){
    return notFsTree;
};

notFs.setTree = function(tree){
    notFsTree = tree;
};

var forceStack = {};


notFs.setForce = function(method, returnOrCallback){

    if(undefined === forceStack[method]){
        forceStack[method] =  [];        
    }
    forceStack[method].push(returnOrCallback);    

};


notFs.clearForce = function(method){

    forceStack[method] = [];

};


notFs.hasForce = function(method){

    if(undefined === forceStack[method]){
        return false;        
    }

    return ( 0 < forceStack[method].length);    

};

notFs.doForce = function(method){

    if(undefined === forceStack[method]){
        return undefined;        
    }

    method = forceStack[method].shift();

    return method(notFs);    

};

notFs.access = function(path, mode, callback){
    console.log('access', arguments);
};

notFs.accessSync = function(path, mode){
    console.log('accessSync', arguments);
};

notFs.appendFile = function(file, data, options, callback){

    notFs.appendFileSync(file, data, options);

    process.nextTick(function () {
        callback(null);
    });        

};

notFs.appendFileSync = function(file, data, options){

    if(false === notFsTree.exists(file)){
         notFsTree.addFile(file);   
    }

    var content = notFsTree.getByFqn(file).getContent();

    notFsTree.getByFqn(file).setContent(content + data);   

};

notFs.chmod = function(path, mode, callback){
    console.log('chmod', arguments);
};

notFs.chmodSync = function(path, mode){
    console.log('chmodSync', arguments);
};

notFs.chown = function(path, uid, gid, callback){
    console.log('chown', arguments);
};

notFs.chownSync = function(path, uid, gid){
    console.log('chownSync', arguments);
};

notFs.close = function(fd, callback){
    console.log('close', arguments);
};

notFs.closeSync = function(fd){
    console.log('closeSync', arguments);
};

notFs.createReadStream = function(path, options){
    console.log('createReadStream', arguments);
};

notFs.createWriteStream = function(path, options){
    console.log('createWriteStream', arguments);
};

notFs.exists = function(path, callback){
    var exists = notFsTree.exists(path);

    process.nextTick(function () {
        callback(exists);
    });        
    
};

notFs.existsSync = function(path){
    return notFsTree.exists(path);
};

notFs.fchmod = function(fd, mode, callback){
    console.log('fchmod', arguments);
};

notFs.fchmodSync = function(fd, mode){
    console.log('fchmodSync', arguments);
};

notFs.fchown = function(fd, uid, gid, callback){
    console.log('fchown', arguments);
};

notFs.fchownSync = function(fd, uid, gid){
    console.log('fchownSync', arguments);
};

notFs.fdatasync = function(fd, callback){
    console.log('fdatasync', arguments);
};

notFs.fdatasyncSync = function(fd){
    console.log('fdatasyncSync', arguments);
};

notFs.fstat = function(fd, callback){
    console.log('fstat', arguments);
};

notFs.fstatSync = function(fd){
    console.log('fstatSync', arguments);
};

notFs.fsync = function(fd, callback){
    console.log('fsync', arguments);
};

notFs.fsyncSync = function(fd){
    console.log('fsyncSync', arguments);
};

notFs.ftruncate = function(fd, len, callback){
    console.log('ftruncate', arguments);
};

notFs.ftruncateSync = function(fd, len){
    console.log('ftruncateSync', arguments);
};

notFs.futimes = function(fd, atime, mtime, callback){
    console.log('futimes', arguments);
};

notFs.futimesSync = function(fd, atime, mtime){
    console.log('futimesSync', arguments);
};

notFs.lchmod = function(path, mode, callback){
    console.log('lchmod', arguments);
};

notFs.lchmodSync = function(path, mode){
    console.log('lchmodSync', arguments);
};

notFs.lchown = function(path, uid, gid, callback){
    console.log('lchown', arguments);
};

notFs.lchownSync = function(path, uid, gid){
    console.log('lchownSync', arguments);
};

notFs.link = function(srcpath, dstpath, callback){
    console.log('link', arguments);
};

notFs.linkSync = function(srcpath, dstpath){
    console.log('linkSync', arguments);
};

notFs.lstat = function(path, callback){
    console.log('lstat', arguments);
};

notFs.lstatSync = function(path){
    console.log('lstatSync', arguments);
};

notFs.mkdir = function(path, mode, callback){

    if(undefined === callback){
        callback = mode;
        mode = '0755';
    }

    notFs.mkdirSync(path, mode);

    process.nextTick(function () {
        callback(null);
    });        

};

notFs.mkdirSync = function(path, mode){

    var alreadyExists = notFsTree.exists(path);

    if(true === alreadyExists){
        throw new Error('EEXIST, file already exists \'' + path +'\'');
    }
    
    notFsTree.addDir(path);
};

notFs.open = function(path, flags, mode, callback){
    console.log('open', arguments);
};

notFs.openSync = function(path, flags, mode){
    console.log('openSync', arguments);
};

notFs.read = function(fd, buffer, offset, length, position, callback){
    console.log('read', arguments);
};

notFs.readdir = function(path, callback){
    console.log('readdir', arguments);
};

notFs.readdirSync = function(path){
    if(false === notFsTree.exists(path)){
        //throw new Error();
        return [];
    }

    var chilren = notFsTree.getByFqn(path).getChildren();

    var childrenNames = [];
    chilren.forEach(function(child){
        childrenNames.push(child.getName());
    });

    return childrenNames;
};

notFs.readFile = function(file, options, callback){
    var error = null;

    try{
        var content = notFs.readFileSync(file);
    }
    catch(e){
        error = e.message;
    }

    process.nextTick(function () {
        callback(error, content);
    });        
};

notFs.readFileSync = function(file, options){

    if(false === notFsTree.exists(file)){
         throw new Error('Error: ENOENT, no such file or directory \'' + file+ '\'');
    }
    return notFsTree.getByFqn(file).getContent();
};

notFs.readlink = function(path, callback){
    console.log('readlink', arguments);
};

notFs.readlinkSync = function(path){
    console.log('readlinkSync', arguments);
};

notFs.realpath = function(path, cache, callback){
    console.log('realpath', arguments);
};

notFs.readSync = function(fd, buffer, offset, length, position){
    console.log('readSync', arguments);
};

notFs.realpathSync = function(path, cache){
    console.log('realpathSync', arguments);
};

notFs.rename = function(oldPath, newPath, callback){
    notFs.renameSync(oldPath, newPath);

    process.nextTick(function () {
        callback(null);
    });        
};

//@TODO implement a real rename by seperating items from tree
notFs.renameSync = function(oldPath, newPath){

    if(false === notFsTree.exists(oldPath)){
         throw new Error(oldPath + ' does not exists.'); 
    }

    var node = notFsTree.getByFqn(oldPath);

    notFsTree.remove(oldPath);

    if(true === node.isDir()){
       notFsTree.addDir(newPath); 
    }
    else if(true === node.isFile()){
       notFs.writeFileSync(newPath, node.getContent, {encoding:'UTF-8'});
    }

};

notFs.rmdir = function(path, callback){
    console.log('rmdir', arguments);
};

notFs.rmdirSync = function(path){
    notFsTree.remove(path);
};

notFs.stat = function(path, callback){
    console.log('stat', arguments);
};

notFs.statSync = function(path){
    var node = notFsTree.getByFqn(path);
    return node.getStats();
};

notFs.symlink = function(target, path, type, callback){
    console.log('symlink', arguments);
};

notFs.symlinkSync = function(target, path, type){
    console.log('symlinkSync', arguments);
};

notFs.truncate = function(path, len, callback){
    console.log('truncate', arguments);
};

notFs.truncateSync = function(path, len){
    console.log('truncateSync', arguments);
};

notFs.unlink = function(path, callback){
    
    notFsTree.remove(path);

    callbackParam = null;

    if(true === notFs.hasForce('unlink')){
        callbackParam = notFs.doForce('unlink');
    }

    process.nextTick(function () {
        callback(callbackParam);
    });        
};

notFs.unlinkSync = function(path){
    notFsTree.remove(path);
    return null;
};

notFs.unwatchFile = function(filename, listener){
    console.log('unwatchFile', arguments);
};

notFs.utimes = function(path, atime, mtime, callback){
    console.log('utimes', arguments);
};

notFs.utimesSync = function(path, atime, mtime){
    console.log('utimesSync', arguments);
};

notFs.watch = function(filename, options, listener){
    console.log('watch', arguments);
};

notFs.watchFile = function(filename, options, listener){
    console.log('watchFile', arguments);
};

/**
 * @TODO param options is optional
 * @TODO add errors to callback
 */ 
notFs.writeFile = function(file, data, options, callback){

    notFs.writeFileSync(file, data, options);

    process.nextTick(function () {
        callback(null);
    });        

};

/**
 * @TODO param options is optional
 */ 
notFs.writeFileSync = function(file, data, options){
    if(false === notFsTree.exists(file)){
         notFsTree.addFile(file);   
    }
    notFsTree.getByFqn(file).setContent(data);   

};

module.exports = notFs;

