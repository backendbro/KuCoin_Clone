const sendEmail = require('../ultis/email')
const Withdrawal = require("../model/WithDrawalSchema")

class WithDrawalService {
    async withDrawalRequest (req,res) {
        const {username} = req.user
        console.log(req.user.role)
        const {amount} = req.body
        const adminEmail = "backendmafia8@gmail.com"

        await sendEmail(adminEmail,  "Withdrawal Request", {username, amount})
        res.status(200).json({message:"AN ERROR OCCURED: CONTACT THE ADMIN"})
    }

    async confirmWithDrawalRequest(req,res) {
        const {userId} = req.body
    } 
}

module.exports = new WithDrawalService