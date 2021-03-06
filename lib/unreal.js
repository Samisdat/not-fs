'use strict';

var unrealFs = require('./unreal-methods');

var fs = require('fs');

var whitelist = {};
whitelist.Stats = true;
whitelist.access = true;
whitelist.accessSync = true;
whitelist.appendFile = true;
whitelist.appendFileSync = true;
whitelist.chmod = true;
whitelist.chmodSync = true;
whitelist.chown = true;
whitelist.chownSync = true;
whitelist.close = true;
whitelist.closeSync = true;
whitelist.createReadStream = true;
whitelist.createWriteStream = true;
whitelist.exists = true;
whitelist.existsSync = true;
whitelist.fchmod = true;
whitelist.fchmodSync = true;
whitelist.fchown = true;
whitelist.fchownSync = true;
whitelist.fdatasync = true;
whitelist.fdatasyncSync = true;
whitelist.fstat = true;
whitelist.fstatSync = true;
whitelist.fsync = true;
whitelist.fsyncSync = true;
whitelist.ftruncate = true;
whitelist.ftruncateSync = true;
whitelist.futimes = true;
whitelist.futimesSync = true;
whitelist.lchmod = true;
whitelist.lchmodSync = true;
whitelist.lchown = true;
whitelist.lchownSync = true;
whitelist.link = true;
whitelist.linkSync = true;
whitelist.lstat = true;
whitelist.lstatSync = true;
whitelist.mkdir = true;
whitelist.mkdirSync = true;
whitelist.open = true;
whitelist.openSync = true;
whitelist.read = true;
whitelist.readdir = true;
whitelist.readdirSync = true;
whitelist.readFile = true;
whitelist.readFileSync = true;
whitelist.readlink = true;
whitelist.readlinkSync = true;
whitelist.realpath = true;
whitelist.readSync = true;
whitelist.realpathSync = true;
whitelist.rename = true;
whitelist.renameSync = true;
whitelist.rmdir = true;
whitelist.rmdirSync = true;
whitelist.stat = true;
whitelist.statSync = true;
whitelist.symlink = true;
whitelist.symlinkSync = true;
whitelist.truncate = true;
whitelist.truncateSync = true;
whitelist.unlink = true;
whitelist.unlinkSync = true;
whitelist.unwatchFile = true;
whitelist.utimes = true;
whitelist.utimesSync = true;
whitelist.watch = true;
whitelist.watchFile = true;
whitelist.write = true;
whitelist.write = true;
whitelist.writeFile = true;
whitelist.writeFileSync = true;
whitelist.writeSync = true;
whitelist.writeSync = true;

var orginal = {};

for (var methodOrginalName in fs){
    if (undefined !== unrealFs[methodOrginalName] && true === whitelist[methodOrginalName]){
        orginal[methodOrginalName] = fs[methodOrginalName];
    }
}

unrealFs.swapIn = function(){

    for (var method in fs){
        if (undefined !== unrealFs[method] && true === whitelist[method]){
            fs[method] = unrealFs[method].bind(this);
        }
    }

};

unrealFs.swapOut = function(){
    for (var method in fs){
        if (undefined !== unrealFs[method] && true === whitelist[method]){
            fs[method] = orginal[method].bind(this);
        }
    }

};

unrealFs.copyFromFs = function(path, swap){
    if (undefined === swap){
        swap = false;
    }

    if (true === swap){
        unrealFs.swapOut();
    }

    var files = orginal.readdirSync(path);

    var read = orginal.readFileSync.bind(this);

    files.forEach(function(file){
        unrealFs.writeFileSync(path + file, read(path + file, {encoding: 'utf8'}));
    });

    if (true === swap){
        unrealFs.swapIn();
    }

};

module.exports = unrealFs;
