'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const semver = require('semver');

const recurse = require('reftools/recurse.js').recurse;
const jptr = require('reftools/jptr.js').jptr;

const defaultVersion = '0.1.0';

function combine(files) {
	let count = 0;
	let version = defaultVersion;
	let output = {};
	output.openapiExtensionFormat = version;

	for (let file of files) {
		count++;
		let s = fs.readFileSync(file,'utf8');
		let input = yaml.safeLoad(s,{json:true});
		for (let prop in input) {
			if (prop === 'openapiExtensionFormat') {

				if (semver.gt(input.openapiExtensionFormat,version)) {
					version = input.openapiExtensionFormat;
				}
			}
			else {
				if (!output[prop]) output[prop] = {};
				output[prop] = Object.assign({},output[prop],input[prop]);
			}
		}
	}

	if (count > 0) {
		output.openapiExtensionFormat = version;
		console.log(yaml.safeDump(output));
	}
}

function split(filename) {
    let s = fs.readFileSync(filename,'utf8');
    let input = yaml.safeLoad(s,{json:true});
    if (input.openapiExtensionFormat) {
        let version = defaultVersion;
        for (let p in input) {
            if (p === 'openapiExtensionFormat') {
                version = input.openapiExtensionFormat;
            }
            else {
                let output = {};
                output.openapiExtensionFormat = version;
                output[p] = input[p];

                // populate everything required by a $ref
                recurse(input[p],{},function(obj,key,state){
                    if ((key === '$ref') && (typeof obj[key] === 'string')) {
                        jptr(output,obj[key],jptr(input,obj[key]));
                    }
                });

                fs.writeFileSync('./'+p+'.yaml',yaml.safeDump(output),'utf8');
            }
        }
    }
    else {
        console.warn('Not a Semoasa document');
    }
}

module.exports = {
	combine : combine,
    split : split
};

