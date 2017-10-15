#!/usr/bin/env node

'use strict';

const split = require('./index.js').split;

for (let i=2;i<process.argv.length;i++) {
    split(process.argv[i]);
}

