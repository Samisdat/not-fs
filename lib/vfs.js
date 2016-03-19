var vfs = {};

var vfsTree;


vfs.getTree = function(){
    return vfsTree;
}

vfs.setTree = function(tree){
    vfsTree = tree;
}


vfs.Stats = function(node) {
  this.vfsNode = node;  
  this.dev = 'dev';
  this.mode = 'mode';
  this.nlink = 'nlink';
  this.uid = 'uid';
  this.gid = 'gid';
  this.rdev = 'rdev';
  this.blksize = 'blksize';
  this.ino = 'ino';
  this.size = 'size';
  this.blocks = 'blocks';
  this.atime = new Date();
  this.mtime = new Date();
  this.ctime = new Date();
  this.birthtime = new Date();
};

vfs.Stats.prototype._checkModeProperty = function(property) {
  throw new Error('not yet implemeted');
};

vfs.Stats.prototype.isDirectory = function() {
    //@TODO what does fs for not existing files
    if(false === this.vfsNode){
        return false;
    }
    return this.vfsNode.isDir();
};

vfs.Stats.prototype.isFile = function() {
    //@TODO what does fs for not existing files
    if(false === this.vfsNode){
        return false;
    }
    return this.vfsNode.isFile();
};

vfs.Stats.prototype.isBlockDevice = function() {
  throw new Error('not yet implemeted');
};

vfs.Stats.prototype.isCharacterDevice = function() {
  throw new Error('not yet implemeted');
};

vfs.Stats.prototype.isSymbolicLink = function() {
  throw new Error('not yet implemeted');
};

vfs.Stats.prototype.isFIFO = function() {
    throw new Error('not yet implemeted');
};

vfs.Stats.prototype.isSocket = function() {
  throw new Error('not yet implemeted');
};

vfs.access = function(path, mode, callback){
    console.log('access', arguments);
};

vfs.accessSync = function(path, mode){
    console.log('accessSync', arguments);
};

vfs.appendFile = function(file, data, options, callback){
    console.log('appendFile', arguments);
};

vfs.appendFileSync = function(file, data, options){
    console.log('appendFileSync', arguments);
};

vfs.chmod = function(path, mode, callback){
    console.log('chmod', arguments);
};

vfs.chmodSync = function(path, mode){
    console.log('chmodSync', arguments);
};

vfs.chown = function(path, uid, gid, callback){
    console.log('chown', arguments);
};

vfs.chownSync = function(path, uid, gid){
    console.log('chownSync', arguments);
};

vfs.close = function(fd, callback){
    console.log('close', arguments);
};

vfs.closeSync = function(fd){
    console.log('closeSync', arguments);
};

vfs.createReadStream = function(path, options){
    console.log('createReadStream', arguments);
};

vfs.createWriteStream = function(path, options){
    console.log('createWriteStream', arguments);
};

vfs.exists = function(path, callback){
    var exists = vfsTree.exists(path);

    process.nextTick(function () {
        callback(exists);
    });        
    
};

vfs.existsSync = function(path){
    return vfsTree.exists(path);
};

vfs.fchmod = function(fd, mode, callback){
    console.log('fchmod', arguments);
};

vfs.fchmodSync = function(fd, mode){
    console.log('fchmodSync', arguments);
};

vfs.fchown = function(fd, uid, gid, callback){
    console.log('fchown', arguments);
};

vfs.fchownSync = function(fd, uid, gid){
    console.log('fchownSync', arguments);
};

vfs.fdatasync = function(fd, callback){
    console.log('fdatasync', arguments);
};

vfs.fdatasyncSync = function(fd){
    console.log('fdatasyncSync', arguments);
};

vfs.fstat = function(fd, callback){
    console.log('fstat', arguments);
};

vfs.fstatSync = function(fd){
    console.log('fstatSync', arguments);
};

vfs.fsync = function(fd, callback){
    console.log('fsync', arguments);
};

vfs.fsyncSync = function(fd){
    console.log('fsyncSync', arguments);
};

vfs.ftruncate = function(fd, len, callback){
    console.log('ftruncate', arguments);
};

vfs.ftruncateSync = function(fd, len){
    console.log('ftruncateSync', arguments);
};

vfs.futimes = function(fd, atime, mtime, callback){
    console.log('futimes', arguments);
};

vfs.futimesSync = function(fd, atime, mtime){
    console.log('futimesSync', arguments);
};

vfs.lchmod = function(path, mode, callback){
    console.log('lchmod', arguments);
};

vfs.lchmodSync = function(path, mode){
    console.log('lchmodSync', arguments);
};

vfs.lchown = function(path, uid, gid, callback){
    console.log('lchown', arguments);
};

vfs.lchownSync = function(path, uid, gid){
    console.log('lchownSync', arguments);
};

vfs.link = function(srcpath, dstpath, callback){
    console.log('link', arguments);
};

vfs.linkSync = function(srcpath, dstpath){
    console.log('linkSync', arguments);
};

vfs.lstat = function(path, callback){
    console.log('lstat', arguments);
};

vfs.lstatSync = function(path){
    console.log('lstatSync', arguments);
};

vfs.mkdir = function(path, mode, callback){
    console.log('mkdir', arguments);
};

vfs.mkdirSync = function(path, mode){

    var alreadyExists = vfsTree.exists(path);

    if(true === alreadyExists){
        throw new Error('EEXIST, file already exists \'' + path +'\'');
    }
    
    vfsTree.addDir(path);
};

vfs.open = function(path, flags, mode, callback){
    console.log('open', arguments);
};

vfs.openSync = function(path, flags, mode){
    console.log('openSync', arguments);
};

vfs.read = function(fd, buffer, offset, length, position, callback){
    console.log('read', arguments);
};

vfs.readdir = function(path, callback){
    console.log('readdir', arguments);
};

vfs.readdirSync = function(path){

    var chilren = vfsTree.getByFqn(path).getChildren();

    var childrenNames = [];
    chilren.forEach(function(child){
        childrenNames.push(child.getName());
    });

    return childrenNames;
};

vfs.readFile = function(file, options, callback){
    console.log('readFile', arguments);
};

vfs.readFileSync = function(file, options){
    if(false === vfsTree.exists(file)){
         throw new Error('Error: ENOENT, no such file or directory \'' + file+ '\'');
    }
    return vfsTree.getByFqn(file).getContent();
};

vfs.readlink = function(path, callback){
    console.log('readlink', arguments);
};

vfs.readlinkSync = function(path){
    console.log('readlinkSync', arguments);
};

vfs.realpath = function(path, cache, callback){
    console.log('realpath', arguments);
};

vfs.readSync = function(fd, buffer, offset, length, position){
    console.log('readSync', arguments);
};

vfs.realpathSync = function(path, cache){
    console.log('realpathSync', arguments);
};

vfs.rename = function(oldPath, newPath, callback){
    console.log('rename', arguments);
};

vfs.renameSync = function(oldPath, newPath){
    console.log('renameSync', arguments);
};

vfs.rmdir = function(path, callback){
    console.log('rmdir', arguments);
};

vfs.rmdirSync = function(path){
    vfsTree.remove(path);
};

vfs.stat = function(path, callback){
    console.log('stat', arguments);
};

vfs.statSync = function(path){
    var node = vfsTree.getByFqn(path);
    return new vfs.Stats(node);
};

vfs.symlink = function(target, path, type, callback){
    console.log('symlink', arguments);
};

vfs.symlinkSync = function(target, path, type){
    console.log('symlinkSync', arguments);
};

vfs.truncate = function(path, len, callback){
    console.log('truncate', arguments);
};

vfs.truncateSync = function(path, len){
    console.log('truncateSync', arguments);
};

vfs.unlink = function(path, callback){
    console.log('unlink', arguments);
};

vfs.unlinkSync = function(path){
    console.log('unlinkSync', arguments);
};

vfs.unwatchFile = function(filename, listener){
    console.log('unwatchFile', arguments);
};

vfs.utimes = function(path, atime, mtime, callback){
    console.log('utimes', arguments);
};

vfs.utimesSync = function(path, atime, mtime){
    console.log('utimesSync', arguments);
};

vfs.watch = function(filename, options, listener){
    console.log('watch', arguments);
};

vfs.watchFile = function(filename, options, listener){
    console.log('watchFile', arguments);
};

vfs.writeFileSync = function(file, data, options){
    if(false === vfsTree.exists(file)){
         vfsTree.addFile(file);   
    }
    vfsTree.getByFqn(file).setContent(data);   

};

module.exports = vfs;

