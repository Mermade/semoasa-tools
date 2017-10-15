#!/usr/bin/env node

'use strict';

const doit = require('./index.js').process;

let files = [];
for (let i=2;i<process.argv.length;i++) {
	files.push(process.argv[i]);
}

if (files.length) {
	doit(files);
}

