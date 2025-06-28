const express = require("express");
const app = express();
const userModel = require("../module/user");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../module/blacklistToken");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklistToken = await BlacklistToken.findOne({token});
    if (blacklistToken) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports.authAI = async (req, res, next) => {
    const {userid} = req.body;

    try{

        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

