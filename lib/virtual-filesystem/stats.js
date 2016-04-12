
var Stats = function(node, properties) {

  /** Public attributes by node js */

  /* ID of device containing file */
  this.dev = 0;

  /* device ID (if special file) */
  this.rdev = 0;
  
  /* protection */
  /* @TODO add file type */
  this.mode = node.permission.getMode();

  /* number of hard links */
  this.nlink = 1;

  /* user ID of owner */
  this.uid = 0;

   /* group ID of owner */
  this.gid = 0;

  /* inode number */
  this.ino = node.getInodeNumber();

  /* total size, in bytes */
  this.size = 0;
  
  /* blocksize for filesystem I/O */
  this.blksize = 4096;

  /* number of blocks allocated */
  this.blocks = 8;
  
  /* time of last access */
  this.atime = new Date();

  /* time of last modification */
  this.mtime = new Date();

  /* time of last status change */
  this.ctime = new Date();

  this.birthtime = new Date();

  /** /Public attributes by node js */

  this._isDir = false;
  this._isFile = false;
  this._isBlockDevice = false;
  this._isCharacterDevice = false;
  this._isSymbolicLink =  false;
  this._isFIFO = false;
  this._isSocket = false;

  var propertyBlacklist = {
    'mode': true,
    'ino': true
  };

  for(var key in properties){
      if(undefined !== propertyBlacklist[key]){
        continue;
      }
      this[key] = properties[key];
  }

};


/**
 * @TODO what does fs for not existing files
 */
Stats.prototype.isDirectory = function() {

    return this._isDir;
};

Stats.prototype.isFile = function() {
    return this._isFile;
};

Stats.prototype.isBlockDevice = function() {
  return this._isBlockDevice;
};

Stats.prototype.isCharacterDevice = function() {
  return this._isCharacterDevice;
};

Stats.prototype.isSymbolicLink = function() {
  return this._isSymbolicLink;
};

Stats.prototype.isFIFO = function() {
    return this._isFIFO;
};

Stats.prototype.isSocket = function() {
  return this._isSocket;
};

module.exports = Stats;

