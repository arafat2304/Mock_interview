const express = require('express');
const router = express.Router();
const AIController = require('../controller/AI');


router.post('/generate', AIController.generate);