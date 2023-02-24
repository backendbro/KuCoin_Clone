const UserSchema = require('../MODEL/UserSchema')
const sendEmail = require('../ULTIS/email')

class UserService {

    async register(req,res) {
        const {email, username, password} = req.body 
        let user = await UserSchema.findOne({email})
        
        if(user){
            return res.status(404).json({message:"USER ALREADY EXIST"})
        }

        user = await UserSchema.create({email, username, password})
        const pin = user.send2FACode()
        await user.save()

        sendEmail(email, "Verify Email KuCoin", {username, pin})
        const token = user.createToken()
       
        res.status(202).json({user, token})
    }

    async confirmPin(req,res) {
        const {pin} = req.body
        
        const user = await UserSchema.findOne({
            FACode:pin,
            FACodeExp:{ $gt: Date.now() }
        })
        
        if(!user){
            return res.status(200).json({message:"INVALID TOKEN"})
        }

        user.FACode = undefined
        user.FACodeExp = undefined
        
        user.isVerifiedAcct = true  
        await user.save()
        
        
        res.status(200).json({message:'EMAIL VERIFIED'})
    }

    async login (req,res) {
        const {email, password} = req.body 
        let user = await UserSchema.findOne({email}).select("+password")
        
        if(!user){
            return res.status(404).json({message:"EMAIL DOES NOT EXIST"})
        }

        const matchPassword = await user.comparePassword(password, user.password)
        if(!matchPassword){
            return res.status(404).json({message: "PASSWORD DOES NOT MATCH"})
        }

        const token = user.createToken()
        res.status(200).json({user, token})
    }
}

module.exports = new UserService

