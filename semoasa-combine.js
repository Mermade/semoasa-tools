#!/usr/bin/env node

'use strict';

const combine = require('./index.js').combine;

let files = [];
for (let i=2;i<process.argv.length;i++) {
	files.push(process.argv[i]);
}

if (files.length) {
	combine(files);
}

