const express = require('express');
const router = express.Router();
const AIController = require('../controller/AI');
const { authAI } = require('../middlewear/auth.user');


router.post('/generate', authAI,AIController.generate);

module.exports = router;