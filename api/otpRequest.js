const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('../model/userSchema');
const urlencodedParser = bodyParser.urlencoded({ extended: false });



router.put("/send-otp",urlencodedParser,async (req,res)=>{
    //console.log(CLIENT_ID,CLIENT_SECRET, REDIRECT_URL,REFRESH_TOKEN);
    //res.send("listening...");
    const {reciverEmail}=req.body;
    console.log(reciverEmail);

    try{
        
        const email = await User.findOne({'email':reciverEmail});
        console.log(email);

        if(!email){
            return res.status(404).json({message:"Email not registered :)"});
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const text = `Your one time password for reset password is  \n ${otp}`;
        const subject = 'BIDX - Reset Password OTP';
        const text1 = `<html><div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">BIDX</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />BIDX</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>
      </html>`
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
            to:reciverEmail,
            subject:subject,
            text:text
            
        }
        
        const result = await transporter.sendMail(mailOptions);
        console.log (result);
        const updatedb = await User.updateOne({'email':reciverEmail},{$set:{'otp':otp}});
        if(updatedb){
            return res.status(202).json({message:'OTP Sent Successfuully',reciverEmail});
        }else{
            return res.status(502).json({message:'Failure'});
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

//resetPassword function
async function resetPassword(email,pass){
    try{
        // generate salt to hash password
    const salt = await bcrypt.genSalt(12);
    // now we set user password to hashed password
    const password = await bcrypt.hash(pass, salt);
    console.log(password);
    const updatePassword = await User.updateOne({'email':email},{$set:{password}});
    if(updatePassword){
        return 202;
    }else{
        return 404;
    }
    }catch(err){
        console.log(err);
        return 404;
    }
}



//verify otp
router.put('/verify-Reset',urlencodedParser,async (req,res)=>{
    const otp =req.body.otp;
    const email = req.body.reciverEmail;
    const pass = req.body.password;
    console.log(email,otp);

    try{
        const result = await User.findOne({email});
        console.log(result.otp,otp);

    if (result.otp == otp){
        var  resu = await resetPassword(email,pass);
        console.log(resu);

        if(resu ==202){
            return res.status(202).json({message:"Password Updated Successfully :)"});
        }else{
            return res.status(404).json({message:"Bad Requests :)"});
        }
    }else{
        res.status(404).json({message:'Incorrect OTP'});
    }
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }  
});

//reset password
router.put('/reset-pswd',urlencodedParser,async (req,res)=>{
    const email = req.body.reciverEmail;
    let pass = req.body.password;
    try{
        // generate salt to hash password
    const salt = await bcrypt.genSalt(12);
    // now we set user password to hashed password
    const password = await bcrypt.hash(pass, salt);
    console.log(password);
    const updatePassword = await User.updateOne({'email':email},{$set:{password}});
    if(updatePassword){
        res.status(202).json({message:'Reset Password Successful'});
    }else{
        res.status(402).json({message:'Password Update Failed'});
    }
    }catch(err){
        console.log(err);
    }   
});


module.exports = router;