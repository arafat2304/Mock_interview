const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./route/user");
const connectDB = require("./DB/DB");
const cors = require("cors");
const PORT=5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})