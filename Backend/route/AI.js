const express = require('express');
const router = express.Router();
const AIController = require('../controller/AI');


router.post('/generate', AIController.generate);
router.post("/ii",(req,res)=>{
    console.log(req.cookies)
})

module.exports = router;