const express = require("express");
const app = express();
const mongoose = require("mongoose");


const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{serverSelectionTimeoutMS:30000})
    .then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectDB;