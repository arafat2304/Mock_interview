const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./route/user");
const connectDB = require("./DB/DB");
const cors = require("cors");
const AIRoute = require("./route/AI");
const cookieParser = require("cookie-parser");

const PORT=5000;

connectDB();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));
app.use(express.json());
app.use('/upload', express.static('upload'));

app.use("/user",userRoute);
app.use("/ai",AIRoute);


app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})



app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})