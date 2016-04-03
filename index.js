var Tree = require('./lib/virtual-filesystem/tree');
var tree = new Tree();

var notFs = require('./lib/virtual-io');
notFs.setTree(tree);

module.exports = notFs;

