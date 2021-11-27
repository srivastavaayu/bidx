const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    userName:{
        type: 'string',
        required:'true'
    },
    firstName: {
        type: 'string',
        required:'true',
        default: 'none'
    },
    lastName: {
        type: 'string',
        required:'true',
        default: 'none'
    },
    password: {
        type: 'string',
        required:'true'
    },
    email: {
        type: 'string',
        required:'true',
        default: 'none'
    },
    phone:{
        type: 'string',
        required:'true',
        default: 'none'
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]

});


userSchema.methods.generateAuthToken = async function() {
    try{
        //console.log("hi from tokens");
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        //console.log(token);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('User',userSchema);

module.exports = User;