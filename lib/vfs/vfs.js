var FsTree = require('../tree/fstree');
var vfs = new FsTree();

vfs.addDir('/foo/bar');

vfs.log();

var fs = require('./fs-proxy')(vfs);

fs = require('fs');

fs.exists('/foobar', function(isExisting){
    console.log(isExisting)
});
console.log(fs.existsSync('/foobar'));

fs.exists('/foo', function(isExisting){
    console.log(isExisting)
});

fs.exists('/foo/bar', function(isExisting){
    console.log(isExisting)
});

console.log(fs.existsSync('/foo/bar'));