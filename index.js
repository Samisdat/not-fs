var Tree = require('./lib/vfs/tree');
var tree = new Tree();

var chai = require('chai');

var fs = require('./lib/vfs')(tree);

