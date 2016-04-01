
var Stats = function(node) {

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

