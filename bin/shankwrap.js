#!/usr/bin/env node
var fs = require('fs');
var shankwrap = require('../index.js');

var shrinkwrapFilename = process.cwd() + '/npm-shrinkwrap.json';
var shrinkwrapFile = require(shrinkwrapFilename);

const BLACKLIST = new Set(process.argv.slice(2));

fs.writeFileSync(shrinkwrapFilename, shankwrap(shrinkwrapFile, BLACKLIST));
