
var callerId = require('caller-id');

module.exports = function(vfsTree){

    var fs = require('fs');

    fs.Stats = function(node) {
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

    fs.Stats.prototype._checkModeProperty = function(property) {
      throw new Error('not yet implemeted');
    };

    fs.Stats.prototype.isDirectory = function() {
        //@TODO what does fs for not existing files
        if(false === this.vfsNode){
            return false;
        }
        return this.vfsNode.isDir();
    };

    fs.Stats.prototype.isFile = function() {
        //@TODO what does fs for not existing files
        if(false === this.vfsNode){
            return false;
        }
        return this.vfsNode.isFile();
    };

    fs.Stats.prototype.isBlockDevice = function() {
      throw new Error('not yet implemeted');
    };

    fs.Stats.prototype.isCharacterDevice = function() {
      throw new Error('not yet implemeted');
    };

    fs.Stats.prototype.isSymbolicLink = function() {
      throw new Error('not yet implemeted');
    };

    fs.Stats.prototype.isFIFO = function() {
        throw new Error('not yet implemeted');
    };

    fs.Stats.prototype.isSocket = function() {
      throw new Error('not yet implemeted');
    };

    /*
    fs.access = function(path, mode, callback){
        console.log('access', arguments);
    };

    fs.accessSync = function(path, mode){
        console.log('accessSync', arguments);
    };

    fs.appendFile = function(file, data, options, callback){
        console.log('appendFile', arguments);
    };

    fs.appendFileSync = function(file, data, options){
        console.log('appendFileSync', arguments);
    };

    fs.chmod = function(path, mode, callback){
        console.log('chmod', arguments);
    };

    fs.chmodSync = function(path, mode){
        console.log('chmodSync', arguments);
    };

    fs.chown = function(path, uid, gid, callback){
        console.log('chown', arguments);
    };

    fs.chownSync = function(path, uid, gid){
        console.log('chownSync', arguments);
    };

    fs.close = function(fd, callback){
        console.log('close', arguments);
    };

    fs.closeSync = function(fd){
        console.log('closeSync', arguments);
    };

    fs.createReadStream = function(path, options){
        console.log('createReadStream', arguments);
    };

    fs.createWriteStream = function(path, options){
        console.log('createWriteStream', arguments);
    };
    */
    fs.exists = function(path, callback){
        var exists = vfsTree.exists(path);

        process.nextTick(function () {
            callback(exists);
        });        
        
    };

    fs.existsSync = function(path){
        return vfsTree.exists(path);
    };
    /*
    fs.fchmod = function(fd, mode, callback){
        console.log('fchmod', arguments);
    };

    fs.fchmodSync = function(fd, mode){
        console.log('fchmodSync', arguments);
    };

    fs.fchown = function(fd, uid, gid, callback){
        console.log('fchown', arguments);
    };

    fs.fchownSync = function(fd, uid, gid){
        console.log('fchownSync', arguments);
        fchownSync(fd, uid, gid);
    };

    fs.fdatasync = function(fd, callback){
        console.log('fdatasync', arguments);
    };

    fs.fdatasyncSync = function(fd){
        console.log('fdatasyncSync', arguments);
    };

    fs.fstat = function(fd, callback){
        console.log('fstat', arguments);
    };

    fs.fstatSync = function(fd){
        console.log('fstatSync', arguments);
    };

    fs.fsync = function(fd, callback){
        console.log('fsync', arguments);
    };

    fs.fsyncSync = function(fd){
        console.log('fsyncSync', arguments);
    };

    fs.ftruncate = function(fd, len, callback){
        console.log('ftruncate', arguments);
    };

    fs.ftruncateSync = function(fd, len){
        console.log('ftruncateSync', arguments);
    };

    fs.futimes = function(fd, atime, mtime, callback){
        console.log('futimes', arguments);
    };

    fs.futimesSync = function(fd, atime, mtime){
        console.log('futimesSync', arguments);
    };

    fs.lchmod = function(path, mode, callback){
        console.log('lchmod', arguments);
    };

    fs.lchmodSync = function(path, mode){
        console.log('lchmodSync', arguments);
    };

    fs.lchown = function(path, uid, gid, callback){
        console.log('lchown', arguments);
    };

    fs.lchownSync = function(path, uid, gid){
        console.log('lchownSync', arguments);
    };

    fs.link = function(srcpath, dstpath, callback){
        console.log('link', arguments);
    };

    fs.linkSync = function(srcpath, dstpath){
        console.log('linkSync', arguments);
    };

    fs.lstat = function(path, callback){
        console.log('lstat', arguments);
    };

    fs.lstatSync = function(path){
        console.log('lstatSync', arguments);
    };

    fs.mkdir = function(path, mode, callback){
        console.log('mkdir', arguments);
    };
    */
    fs.mkdirSync = function(path, mode){
        var alreadyExists = vfsTree.exists(path);

        if(true === alreadyExists){
            throw new Error('EEXIST, file already exists \'' + path +'\'');
        }
        
        vfsTree.addDir(path);
    };
    /*
    fs.open = function(path, flags, mode, callback){
        console.log('open', arguments);
    };

    fs.openSync = function(path, flags, mode){
        console.log('openSync', arguments);
    };

    fs.read = function(fd, buffer, offset, length, position, callback){
        console.log('read', arguments);
    };

    fs.readdir = function(path, callback){
        console.log('readdir', arguments);
    };
    */
    fs.readdirSync = function(path){
        
        var chilren = vfsTree.getByFqn(path).getChildren();

        var childrenNames = [];
        chilren.forEach(function(child){
            childrenNames.push(child.getName());
        });

        return childrenNames;
    };
    /*
    fs.readFile = function(file, options, callback){
        console.log('readFile', arguments);
    };

    fs.readFileSync = function(file, options){
        console.log('readFileSync', arguments);
    };

    fs.readlink = function(path, callback){
        console.log('readlink', arguments);
    };

    fs.readlinkSync = function(path){
        console.log('readlinkSync', arguments);
    };

    fs.realpath = function(path, cache, callback){
        console.log('realpath', arguments);
    };

    fs.readSync = function(fd, buffer, offset, length, position){
        console.log('readSync', arguments);
    };
    */

    fs.realpathSync = function(path, cache){
        
        console.log('realpathSync', arguments);
    };
    /*
    fs.rename = function(oldPath, newPath, callback){
        console.log('rename', arguments);
    };

    fs.renameSync = function(oldPath, newPath){
        console.log('renameSync', arguments);
    };

    fs.rmdir = function(path, callback){
        console.log('rmdir', arguments);
    };
    */
    fs.rmdirSync = function(path){
        vfsTree.remove(path);
    };
    /*
    fs.stat = function(path, callback){
        console.log('stat', arguments);
    };
    */
    fs.statSync = function(path){
        var node = vfsTree.getByFqn(path);
        return new fs.Stats(node);
    };
    /*
    fs.symlink = function(target, path, type, callback){
        console.log('symlink', arguments);
    };

    fs.symlinkSync = function(target, path, type){
        console.log('symlinkSync', arguments);
    };

    fs.truncate = function(path, len, callback){
        console.log('truncate', arguments);
    };

    fs.truncateSync = function(path, len){
        console.log('truncateSync', arguments);
    };

    fs.unlink = function(path, callback){
        console.log('unlink', arguments);
    };

    fs.unlinkSync = function(path){
        console.log('unlinkSync', arguments);
    };

    fs.unwatchFile = function(filename, listener){
        console.log('unwatchFile', arguments);
    };

    fs.utimes = function(path, atime, mtime, callback){
        console.log('utimes', arguments);
    };

    fs.utimesSync = function(path, atime, mtime){
        console.log('utimesSync', arguments);
    };

    fs.watch = function(filename, options, listener){
        console.log('watch', arguments);
    };

    fs.watchFile = function(filename, options, listener){
        console.log('watchFile', arguments);
    };

    fs.write = function(fd, buffer, offset, length, position, callback){
        console.log('write', arguments);
    };

    fs.write = function(fd, data, position, encoding, callback){
        console.log('write', arguments);
    };

    fs.writeFile = function(file, data, options, callback){
        console.log('writeFile', arguments);
    };

    fs.writeFileSync = function(file, data, options){
        console.log('writeFileSync', arguments);
    };

    fs.writeSync = function(fd, buffer, offset, length, position){
        console.log('writeSync', arguments);
    };

    fs.writeSync = function(fd, data, position, encoding){
        console.log('writeSync', arguments);
    };
    */
    return fs;

};

