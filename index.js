'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const semver = require('semver');

function process(files) {
	let count = 0;
	let version = '0.1.0';
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

module.exports = {
	process : process
};

