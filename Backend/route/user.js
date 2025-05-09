const express = require("express");
const router = express.Router();
const userController = require("../controller/user")
const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"upload/");
    },

    filename:(req,file,cb)=>{
        const suffix = Date.now();
        cb(null,suffix+ '-' + file.originalname)
    }
})

const upload = multer({storage})

router.post("/register",upload.fields([{name:"profilePic",maxCount:1},{name:"resume",maxCount:1}]),userController.register)

router.post("/login",userController.login);
module.exports=router;