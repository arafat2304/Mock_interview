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

module.exports.login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isPasswordValid = await user.comparePassword(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true, // ✅ Prevents JS access (XSS protection)
            secure: process.env.NODE_ENV === "production", // ✅ Send only over HTTPS in prod
            sameSite: "Strict", // ✅ Protect against CSRF; or "Lax" for more compatibility
            maxAge: 24 * 60 * 60 * 1000 // ✅ 1 day in milliseconds
                });

        res.status(200).json({message:"Login successful",token,user});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
