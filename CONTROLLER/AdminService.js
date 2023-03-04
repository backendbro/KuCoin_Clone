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
        
        const user = await UserSchema.findById(req.params.userId)
        if(!user){
            return res.status(404).json("NO USER FOUND")
        }
        res.status(200).json(user)
    }

    async  makeDeposit(req,res) {
        const {amt, userId} = req.body 
        const user = await UserSchema.findById(userId)
        const amount = parseInt(amt)
        
        const paymentObj = {amount, user}
        const findDepositLedger = await PaymentSchema.findOne({user})
        if(findDepositLedger){
           
            let balance = amount
            findDepositLedger.amount.forEach(amount => {
                balance = balance + amount
            })

            const newDeposit = await PaymentSchema.findByIdAndUpdate(findDepositLedger.id, {$push:{amount}, balance}, {new:true})
            return res.status(200).json({newDeposit})
        }

        const payment = await PaymentSchema.create(paymentObj)

        res.status(200).json({payment})
    }

    async getDeposits (req,res) {
        const user = "ME NIGGA!"
        res.json(user)
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