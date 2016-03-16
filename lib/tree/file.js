var Node = require('./node');

var File = function(name, parent) {
    Node.call(this, name, parent);
};

File.prototype = Object.create(Node.prototype);
File.prototype.constructor = File;


File.prototype.isFile = function(){
    return true;
};

File.prototype.isDir = function(){
    return false;
};

module.exports = File;