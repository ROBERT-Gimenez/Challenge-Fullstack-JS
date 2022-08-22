const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const registerValidator = require('../validations/registerValidation');
const loginValidator = require('../validations/Loginvalidator');

/* User login */
router.post('/login', loginValidator, indexController.processLogin);
router.get('/logout', indexController.logout);

/* User register */
router.post('/register', registerValidator, indexController.processRegister);


module.exports = router