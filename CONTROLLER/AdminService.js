const PaymentSchema = require('../MODEL/PaymentSchema')
const UserSchema = require('../MODEL/UserSchema')

class PaymentService {

    async getUsers(req,res) {
        const users = await UserSchema.find({role:"User"})
        if(!users){
            return res.status(404).json("NO USERS FOUND")
        }
        res.status(200).json(users)
    }

    async getSingleUser(req,res) {
        const user = await UserSchema.findById(req.body.userId)
        if(!user){
            return res.status(404).json("NO USER FOUND")
        }
        res.status(200).json()
    }

    async  makeDeposit(req,res) {
        const {amount, userId} = req.body 
        const user = await UserSchema.findById(userId)

        
        const paymentObj = {amount, user}

        const payment = await PaymentSchema.create(paymentObj)
        const topUpBalance = await payment.topUpBalance(amount)

        await payment.save()
        res.status(200).json({payment, topUpBalance})
    }

    async getDeposits (req,res) {
        const deposits = await PaymentSchema.find()
        if(!deposits){
            res.status(404).json("NO DEPOSITS YET!")
        }

        res.status(200).json(deposits)
    }

    async getSingleDeposits (req,res) {
        const user = await UserSchema.findById(req.body.userId)
        const singleDeposit = await PaymentSchema.findById(user)
        res.status(200).json(singleDeposit)
    }

    async getWithdrawalRequests(req,res) {
        const withdrawalRequests = await WithDrawalSchema.find()
    }
}

module.exports = new PaymentService