'use strict';

var express = require('express');
var router = express.Router();
var nconf = require('nconf');

router.use(require('./authz'));

router.use(require('./login'));
router.use(require('./books'));
router.use(require('./create-books'));
router.use(require('./restock-request'));

module.exports = router;







