const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"Name must be contain atleast 3 Character"]
    },
    email:{
        type:String,
        required:true,
        minlength:[5,"Email Must be contain 5 character"],
        unique:true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const user = mongoose.model("User",userSchema);

module.exports = user;