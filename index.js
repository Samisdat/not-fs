var Tree = require('./lib/virtual-filesystem/virtual-filesystem');
var tree = new Tree();

var notFs = require('./lib/unreal');
notFs.setTree(tree);

module.exports = notFs;

