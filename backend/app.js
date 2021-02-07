const express = require("express");
const mongoose = require("mongoose");
const Routes  = require("./routes/user")
const dotenv = require("dotenv");
dotenv.config();
const uri = "";
// const uri = process.env.MONGO_URL;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',Routes);


app.listen(8000,()=>{
    console.log("server is on")
})
