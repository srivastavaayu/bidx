const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');

router.post('/loginUser', async (req, res) => {

    try {

        const {userName,password} = req.body;

        const userExit = await User.findOne({ userName });
        if (userExit) {
            const validPassword = await bcrypt.compare(password, userExit.password);
            if (validPassword) {

                //tokenization
                token = await userExit.generateAuthToken();
                console.log(token);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 7200000),
                    httpOnly: true
                });

                return res.status(202).json({ message: userExit });
            } else {
                return res.status(402).json({ message: "Invalid Credantials" });
            }
        } else {
            return res.status(402).json({ message: "UserName does not exist" });
        }


    } catch (err) {
        console.log(err);
        return res.status(404).json({message:"Bad Requests :)"});
    }

})





module.exports = router;