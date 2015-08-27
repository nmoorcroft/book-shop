'use strict';

var express = require('express');
var router = express.Router();

router.use(require('./books'));
router.use(require('./create-books'));

module.exports = router;







