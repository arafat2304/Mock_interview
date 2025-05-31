const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./route/user");
const connectDB = require("./DB/DB");
const cors = require("cors");
const AIRoute = require("./route/AI");
const cookieParser = require("cookie-parser");
const path = require("path");

const PORT=5000;

connectDB();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/upload', express.static('upload'));

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.use("/user",userRoute);
app.use("/ai",AIRoute);


app.get("/",(req,res)=>{
    res.send("Backend is Running ")
})

// Catch-all: Serve index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})