
var Stats = function(node) {

  /* ID of device containing file */
  this.dev = 'dev';

  /* device ID (if special file) */
  this.rdev = 'rdev';
  
  /* protection */
  this.mode = 'mode';

  /* number of hard links */
  this.nlink = 'nlink';

  /* user ID of owner */
  this.uid = process.getuid();

   /* group ID of owner */
  this.gid = process.getgid();

  this.blksize = 'blksize';

  /* inode number */
  this.ino = 'ino';

  /* total size, in bytes */
  this.size = 0;
  
  /* blocksize for filesystem I/O */
  this.blksize = 4096;

  
  /* number of blocks allocated */
  this.blocks = 'blocks';

  
  /* time of last access */
  this.atime = new Date();

  /* time of last modification */
  this.mtime = new Date();

  /* time of last status change */
  this.ctime = new Date();
  this.birthtime = new Date();

  this._isDir = node.isDir();

  this._isFile = node.isFile();
};

Stats.prototype._checkModeProperty = function(property) {
  throw new Error('not yet implemeted');
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
  throw new Error('not yet implemeted');
};

Stats.prototype.isCharacterDevice = function() {
  throw new Error('not yet implemeted');
};

Stats.prototype.isSymbolicLink = function() {
  throw new Error('not yet implemeted');
};

Stats.prototype.isFIFO = function() {
    throw new Error('not yet implemeted');
};

Stats.prototype.isSocket = function() {
  throw new Error('not yet implemeted');
};

module.exports = Stats;

