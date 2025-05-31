const express = require('express');
const router = express.Router();
const AIController = require('../controller/AI');
const { authUser } = require('../middlewear/auth.user');


router.post('/generate', authUser,AIController.generate);

module.exports = router;