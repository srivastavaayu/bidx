//sendibng a notifications to buyers(winner) and sellers about contact details


const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const User = require('../model/userSchema');
const nodemailer = require('nodemailer');



//sending mail to buyer
async function sendMailBuyer(buyerData,sellerData,productName){
    try{
        const text = `Congratulations for winning the bid  \n Here are the seller Details \n\n Seller's Email : ${sellerData.email} 
                \n\n Seller's Phone Number : ${sellerData.phone}`;
        const subject = `BIDX - ${productName}`;
        console.log(text);

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        
        });
        

        var mailOptions = {
            from:process.env.USER,
            to:buyerData.email,
            subject:subject,
            text:text
            
        }
        
        const result = await transporter.sendMail(mailOptions);
        console.log (result);
        if(result){
            return 202;
        }else{
            return 404;
        }

    }catch(err){
        console.log(err);
        return 404;
    }
}

async function sendMailSeller(buyerData,sellerData,productName){
    try{
        const text = `Congratulations ,You get an buyer for your product ${productName} \n Here are the  Buyer's Details \n\n Buyer's Email : ${buyerData.email} 
                \n\n Buyer's Phone Number : ${buyerData.phone}`;
        const subject = `BIDX - ${productName}`;
        console.log(text);

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        
        });
        

        var mailOptions = {
            from:process.env.USER,
            to:sellerData.email,
            subject:subject,
            text:text
            
        }
        
        const result = await transporter.sendMail(mailOptions);
        console.log (result);
        if(result){
            return 202;
        }else{
            return 404;
        }

    }catch(err){
        console.log(err);
        return 404;
    }
}

async function sendNotification(){
    try{
        const date = new Date();
        //console.log(date);
        var finalResult=[];
        const result = await Product.find({duration:{$lt:date},sendNotification:false});

        for(var i = 0; i < result.length; i++) {
            var obj = result[i];
            if(obj.bids.length==0){
                console.log('No Bids Available');
                continue;
            }
        
            var buyer = obj.bids[obj.bids.length -1];
            var seller = obj.creatorId;

            var buyerData = await User.findOne({'userName':buyer.userName});
            var sellerData = await User.findOne({'_id':seller});

            //sending mail 
            var buyerMail = await sendMailBuyer(buyerData,sellerData,obj.prodName);
            var sellerMail = await sendMailSeller(buyerData,sellerData,obj.prodName);

            console.log(buyerMail,sellerMail);

            if(buyerMail==202 && sellerMail==202){
                const result = await Product.updateOne({'_id':obj._id},{$set:{'sendNotification':true}});
                console.log(result);
            }

        }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }
}


module.exports = sendNotification;