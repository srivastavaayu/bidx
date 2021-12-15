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
app.use(require('./api/addProduct'));
app.use(require('./api/addBid'));
app.use(require('./api/viewRecievedBids'));
app.use(require('./api/viewBid'));
app.use(require('./api/viewProduct'));
app.use(require('./api/editProfile'));
app.use(require('./api/editPassword'));
app.use(require('./api/categoryCount'));
app.use(require('./api/viewParticularProduct'));
app.use(require('./api/viewUserProfile'));
app.use(require('./api/soldItems'));

app.use(require('./api/otpRequest'));



app.get("",(req,res)=>{
    res.send("hello user");
});

app.listen(PORT,()=>{
    console.log(`server at ${PORT}`);
});