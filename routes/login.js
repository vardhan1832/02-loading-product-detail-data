const express = require('express')
const loginController = require('../controllers/login')
const passController = require('../controllers/passwordsib')
const router = express.Router();

router.post('/user/login',loginController.loginUser)
router.post('/password/forgotpassword',passController.forgotpassword)

module.exports = router;