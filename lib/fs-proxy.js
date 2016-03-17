module.exports = function(vfs){

    var fs = require('fs');

    var access = fs.access;
    fs.access = function(path, mode, callback){
        console.log('access', arguments);
        access(path, mode, callback);
    };

    var accessSync = fs.accessSync;
    fs.accessSync = function(path, mode){
        console.log('accessSync', arguments);
        accessSync(path, mode);
    };

    var appendFile = fs.appendFile;
    fs.appendFile = function(file, data, options, callback){
        console.log('appendFile', arguments);
        appendFile(file, data, options, callback);
    };

    var appendFileSync = fs.appendFileSync;
    fs.appendFileSync = function(file, data, options){
        console.log('appendFileSync', arguments);
        appendFileSync(file, data, options);
    };

    var chmod = fs.chmod;
    fs.chmod = function(path, mode, callback){
        console.log('chmod', arguments);
        chmod(path, mode, callback);
    };

    var chmodSync = fs.chmodSync;
    fs.chmodSync = function(path, mode){
        console.log('chmodSync', arguments);
        chmodSync(path, mode);
    };

    var chown = fs.chown;
    fs.chown = function(path, uid, gid, callback){
        console.log('chown', arguments);
        chown(path, uid, gid, callback);
    };

    var chownSync = fs.chownSync;
    fs.chownSync = function(path, uid, gid){
        console.log('chownSync', arguments);
        chownSync(path, uid, gid);
    };

    var close = fs.close;
    fs.close = function(fd, callback){
        console.log('close', arguments);
        close(fd, callback);
    };

    var closeSync = fs.closeSync;
    fs.closeSync = function(fd){
        console.log('closeSync', arguments);
        closeSync(fd);
    };

    var createReadStream = fs.createReadStream;
    fs.createReadStream = function(path, options){
        console.log('createReadStream', arguments);
        createReadStream(path, options);
    };

    var createWriteStream = fs.createWriteStream;
    fs.createWriteStream = function(path, options){
        console.log('createWriteStream', arguments);
        createWriteStream(path, options);
    };

    var exists = fs.exists;
    fs.exists = function(path, callback){
        process.nextTick(function(){
            callback(vfs.exists(path));    
        });
    };

    var existsSync = fs.existsSync;
    fs.existsSync = function(path){
        return vfs.exists(path);
    };

    var fchmod = fs.fchmod;
    fs.fchmod = function(fd, mode, callback){
        console.log('fchmod', arguments);
        fchmod(fd, mode, callback);
    };

    var fchmodSync = fs.fchmodSync;
    fs.fchmodSync = function(fd, mode){
        console.log('fchmodSync', arguments);
        fchmodSync(fd, mode);
    };

    var fchown = fs.fchown;
    fs.fchown = function(fd, uid, gid, callback){
        console.log('fchown', arguments);
        fchown(fd, uid, gid, callback);
    };

    var fchownSync = fs.fchownSync;
    fs.fchownSync = function(fd, uid, gid){
        console.log('fchownSync', arguments);
        fchownSync(fd, uid, gid);
    };

    var fdatasync = fs.fdatasync;
    fs.fdatasync = function(fd, callback){
        console.log('fdatasync', arguments);
        fdatasync(fd, callback);
    };

    var fdatasyncSync = fs.fdatasyncSync;
    fs.fdatasyncSync = function(fd){
        console.log('fdatasyncSync', arguments);
        fdatasyncSync(fd);
    };

    var fstat = fs.fstat;
    fs.fstat = function(fd, callback){
        console.log('fstat', arguments);
        fstat(fd, callback);
    };

    var fstatSync = fs.fstatSync;
    fs.fstatSync = function(fd){
        console.log('fstatSync', arguments);
        fstatSync(fd);
    };

    var fsync = fs.fsync;
    fs.fsync = function(fd, callback){
        console.log('fsync', arguments);
        fsync(fd, callback);
    };

    var fsyncSync = fs.fsyncSync;
    fs.fsyncSync = function(fd){
        console.log('fsyncSync', arguments);
        fsyncSync(fd);
    };

    var ftruncate = fs.ftruncate;
    fs.ftruncate = function(fd, len, callback){
        console.log('ftruncate', arguments);
        ftruncate(fd, len, callback);
    };

    var ftruncateSync = fs.ftruncateSync;
    fs.ftruncateSync = function(fd, len){
        console.log('ftruncateSync', arguments);
        ftruncateSync(fd, len);
    };

    var futimes = fs.futimes;
    fs.futimes = function(fd, atime, mtime, callback){
        console.log('futimes', arguments);
        futimes(fd, atime, mtime, callback);
    };

    var futimesSync = fs.futimesSync;
    fs.futimesSync = function(fd, atime, mtime){
        console.log('futimesSync', arguments);
        futimesSync(fd, atime, mtime);
    };

    var lchmod = fs.lchmod;
    fs.lchmod = function(path, mode, callback){
        console.log('lchmod', arguments);
        lchmod(path, mode, callback);
    };

    var lchmodSync = fs.lchmodSync;
    fs.lchmodSync = function(path, mode){
        console.log('lchmodSync', arguments);
        lchmodSync(path, mode);
    };

    var lchown = fs.lchown;
    fs.lchown = function(path, uid, gid, callback){
        console.log('lchown', arguments);
        lchown(path, uid, gid, callback);
    };

    var lchownSync = fs.lchownSync;
    fs.lchownSync = function(path, uid, gid){
        console.log('lchownSync', arguments);
        lchownSync(path, uid, gid);
    };

    var link = fs.link;
    fs.link = function(srcpath, dstpath, callback){
        console.log('link', arguments);
        link(srcpath, dstpath, callback);
    };

    var linkSync = fs.linkSync;
    fs.linkSync = function(srcpath, dstpath){
        console.log('linkSync', arguments);
        linkSync(srcpath, dstpath);
    };

    var lstat = fs.lstat;
    fs.lstat = function(path, callback){
        console.log('lstat', arguments);
        lstat(path, callback);
    };

    var lstatSync = fs.lstatSync;
    fs.lstatSync = function(path){
        console.log('lstatSync', arguments);
        lstatSync(path);
    };

    var mkdir = fs.mkdir;
    fs.mkdir = function(path, mode, callback){
        console.log('mkdir', arguments);
        mkdir(path, mode, callback);
    };

    var mkdirSync = fs.mkdirSync;
    fs.mkdirSync = function(path, mode){
        console.log('mkdirSync', arguments);
        mkdirSync(path, mode);
    };

    var open = fs.open;
    fs.open = function(path, flags, mode, callback){
        console.log('open', arguments);
        open(path, flags, mode, callback);
    };

    var openSync = fs.openSync;
    fs.openSync = function(path, flags, mode){
        console.log('openSync', arguments);
        openSync(path, flags, mode);
    };

    var read = fs.read;
    fs.read = function(fd, buffer, offset, length, position, callback){
        console.log('read', arguments);
        read(fd, buffer, offset, length, position, callback);
    };

    var readdir = fs.readdir;
    fs.readdir = function(path, callback){
        console.log('readdir', arguments);
        readdir(path, callback);
    };

    var readdirSync = fs.readdirSync;
    fs.readdirSync = function(path){
        
        var chilren = vfs.getByFqn(path).getChildren();

        var childrenNames = [];
        chilren.forEach(function(child){
            childrenNames.push(child.getName);
        });

        return childrenNames;
    };

    var readFile = fs.readFile;
    fs.readFile = function(file, options, callback){
        console.log('readFile', arguments);
        readFile(file, options, callback);
    };

    var readFileSync = fs.readFileSync;
    fs.readFileSync = function(file, options){
        console.log('readFileSync', arguments);
        readFileSync(file, options);
    };

    var readlink = fs.readlink;
    fs.readlink = function(path, callback){
        console.log('readlink', arguments);
        readlink(path, callback);
    };

    var readlinkSync = fs.readlinkSync;
    fs.readlinkSync = function(path){
        console.log('readlinkSync', arguments);
        readlinkSync(path);
    };

    var realpath = fs.realpath;
    fs.realpath = function(path, cache, callback){
        console.log('realpath', arguments);
        realpath(path, cache, callback);
    };

    var readSync = fs.readSync;
    fs.readSync = function(fd, buffer, offset, length, position){
        console.log('readSync', arguments);
        readSync(fd, buffer, offset, length, position);
    };

    var realpathSync = fs.realpathSync;
    fs.realpathSync = function(path, cache){
        console.log('realpathSync', arguments);
        realpathSync(path, cache);
    };

    var rename = fs.rename;
    fs.rename = function(oldPath, newPath, callback){
        console.log('rename', arguments);
        rename(oldPath, newPath, callback);
    };

    var renameSync = fs.renameSync;
    fs.renameSync = function(oldPath, newPath){
        console.log('renameSync', arguments);
        renameSync(oldPath, newPath);
    };

    var rmdir = fs.rmdir;
    fs.rmdir = function(path, callback){
        console.log('rmdir', arguments);
        rmdir(path, callback);
    };

    var rmdirSync = fs.rmdirSync;
    fs.rmdirSync = function(path){
        console.log('rmdirSync', arguments);
        rmdirSync(path);
    };

    var stat = fs.stat;
    fs.stat = function(path, callback){
        console.log('stat', arguments);
        stat(path, callback);
    };

    var statSync = fs.statSync;
    fs.statSync = function(path){
        console.log('statSync', arguments);
        statSync(path);
    };

    var symlink = fs.symlink;
    fs.symlink = function(target, path, type, callback){
        console.log('symlink', arguments);
        symlink(target, path, type, callback);
    };

    var symlinkSync = fs.symlinkSync;
    fs.symlinkSync = function(target, path, type){
        console.log('symlinkSync', arguments);
        symlinkSync(target, path, type);
    };

    var truncate = fs.truncate;
    fs.truncate = function(path, len, callback){
        console.log('truncate', arguments);
        truncate(path, len, callback);
    };

    var truncateSync = fs.truncateSync;
    fs.truncateSync = function(path, len){
        console.log('truncateSync', arguments);
        truncateSync(path, len);
    };

    var unlink = fs.unlink;
    fs.unlink = function(path, callback){
        console.log('unlink', arguments);
        unlink(path, callback);
    };

    var unlinkSync = fs.unlinkSync;
    fs.unlinkSync = function(path){
        console.log('unlinkSync', arguments);
        unlinkSync(path);
    };

    var unwatchFile = fs.unwatchFile;
    fs.unwatchFile = function(filename, listener){
        console.log('unwatchFile', arguments);
        unwatchFile(filename, listener);
    };

    var utimes = fs.utimes;
    fs.utimes = function(path, atime, mtime, callback){
        console.log('utimes', arguments);
        utimes(path, atime, mtime, callback);
    };

    var utimesSync = fs.utimesSync;
    fs.utimesSync = function(path, atime, mtime){
        console.log('utimesSync', arguments);
        utimesSync(path, atime, mtime);
    };

    var watch = fs.watch;
    fs.watch = function(filename, options, listener){
        console.log('watch', arguments);
        watch(filename, options, listener);
    };

    var watchFile = fs.watchFile;
    fs.watchFile = function(filename, options, listener){
        console.log('watchFile', arguments);
        watchFile(filename, options, listener);
    };

    var write = fs.write;
    fs.write = function(fd, buffer, offset, length, position, callback){
        console.log('write', arguments);
        write(fd, buffer, offset, length, position, callback);
    };

    var write = fs.write;
    fs.write = function(fd, data, position, encoding, callback){
        console.log('write', arguments);
        write(fd, data, position, encoding, callback);
    };

    var writeFile = fs.writeFile;
    fs.writeFile = function(file, data, options, callback){
        console.log('writeFile', arguments);
        writeFile(file, data, options, callback);
    };

    var writeFileSync = fs.writeFileSync;
    fs.writeFileSync = function(file, data, options){
        console.log('writeFileSync', arguments);
        writeFileSync(file, data, options);
    };

    var writeSync = fs.writeSync;
    fs.writeSync = function(fd, buffer, offset, length, position){
        console.log('writeSync', arguments);
        writeSync(fd, buffer, offset, length, position);
    };

    var writeSync = fs.writeSync;
    fs.writeSync = function(fd, data, position, encoding){
        console.log('writeSync', arguments);
        writeSync(fd, data, position, encoding);
    };

    return fs;

};

