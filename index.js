var Tree = require('./lib/unreal-filesystem/tree');
var tree = new Tree();

var unrealFs = require('./lib/unreal');
unrealFs.setTree(tree);

module.exports = unrealFs;

