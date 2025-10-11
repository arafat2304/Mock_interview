const express = require('express');
const router = express.Router();
const AIController = require('../controller/AI');
const { authAI } = require('../middlewear/auth.user');


router.post('/generate', authAI,AIController.generate);

router.post("/answer",authAI,AIController.saved);

router.post("/evaluate",authAI,AIController.evalution);

router.get("/history",AIController.history);

router.get("/:id",AIController.interview);


module.exports = router;