const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express()
const connectDB = require("./config/db");



// static 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
 
dotenv.config({
    path: "./config/config.env"
})

// db connect 
connectDB()


const PORT = process.env.PORT || 5000;

// routes 
app.use("/api/v1/stores",require("./routes/stores"));


app.listen(PORT,()=>{
    console.log(`
    Mode : ${process.env.NODE_ENV},
    http://localhost:${PORT}
    `);
})