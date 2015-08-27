'use strict';

var nconf = require('nconf');
var fs = require('fs');
var yaml = require('js-yaml');

module.exports = function () {
    nconf.env().argv();

    var configPath = nconf.get('conf');
    if (!configPath) {
        console.log('usage: www --conf=config.yml');
        process.exit(1);
    }

    if (!fs.existsSync(configPath)) {
        console.log('www: ' + configPath + ': not found');
        process.exit(1);
    }

    nconf.file({
        file: configPath,
        format: {
            parse: yaml.safeLoad,
            stringify: yaml.safeDump
        }
    });

};


