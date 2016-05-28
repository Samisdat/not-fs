var Tree = require('./lib/unreal-filesystem/filesystem');
var tree = new Tree();

var notFs = require('./lib/unreal');
notFs.setTree(tree);

module.exports = notFs;

