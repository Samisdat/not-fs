var Tree = require('./lib/virtual-filesystem/virtual-filesystem');
var tree = new Tree();

var notFs = require('./lib/virtual-io');
notFs.setTree(tree);

module.exports = notFs;

