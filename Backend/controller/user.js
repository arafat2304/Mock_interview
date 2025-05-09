const express = require("express");
const userModel = require("../module/user");


module.exports.register = async (req,res)=>{

    try{
    photoPath =  req.files['profilePic']?.[0].path;
    resumePath =  req.files['resume']?.[0].path;
    const {name,email,password} = req.body;

    const hashedPasword = await userModel.hashPassword(password);
    const user = new userModel({
        name,
        email,
        password:hashedPasword,
       photo:photoPath,
       resume:resumePath
    })

   await user.save();

   res.status(201).json({ message: "User registered successfully", user,});

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

