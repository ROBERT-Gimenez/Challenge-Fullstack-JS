const express = require('express');
const router = express.Router();
const indexController = require('../Controllers/indexController');

/* GET - Index */
router.get('/', indexController.index);
router.get('/movements', indexController.movements);

module.exports = router