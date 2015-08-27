'use strict';

var nconf = require('nconf');
var yaml = require('js-yaml');

nconf.file({
    file: 'config.yml',
    format: {
        parse: yaml.safeLoad,
        stringify: yaml.safeDump
    }
});

module.exports = require('../../src/app');

