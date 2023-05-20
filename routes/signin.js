const express = require('express')
const signinController = require('../controllers/signin')
const router = express.Router();

router.post('/user/sign-up',signinController.postUserDetails)

module.exports = router;