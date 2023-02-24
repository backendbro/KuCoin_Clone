const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


const UserSchema = new mongoose.Schema ({
    email:{
        type:String,
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    FACode:String,
    FACodeExp:Date,
    isVerifiedAcct:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})


UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
};



UserSchema.methods.createToken = function(){
    const token = jwt.sign({id:this._id}, process.env.secretKey, { expiresIn: process.env.time });
    return token;
}


UserSchema.methods.decryptJwt = async (token) => {
    try {
     const userId = jwt.verify(token, process.env.secretKey)
     return userId.id
    } catch (error) {
     return
    }
 }


UserSchema.methods.send2FACode = function(){
    const token = crypto.randomBytes(3).toString('hex')
    this.FACode = token

    this.FACodeExp = Date.now() + 100 * 60 * 1000
    return token
}

module.exports = mongoose.model('User', UserSchema)