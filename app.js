const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

dotenv.config({path : './config.env'});

require("./db/conn");

app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT;


//API's
app.use(require('./api/userCreation'));
app.use(require('./api/login'));




app.get("",(req,res)=>{
    res.send("hello user");
});

app.listen(PORT,()=>{
    console.log(`server at ${PORT}`);
});