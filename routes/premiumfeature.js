const express = require('express')
const premiumController = require('../controllers/premiumfeature')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.get('/premium/showleaderboard',userauthentication.authentication,premiumController.getleaderboard)

module.exports = router;