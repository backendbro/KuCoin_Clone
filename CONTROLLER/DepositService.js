const PaymentSchema = require('../MODEL/PaymentSchema')
const UserSchema = require('../MODEL/UserSchema')

class DepositService {
    
    async getDeposits (req,res) {
        const deposits = await PaymentSchema.find()
        if(!deposits){
            return res.status(404).json("NO DEPOSITS FOUND")
        }
        res.status(200).json(deposits)
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

        res.status(201).json({payment})
    }

    async getSingleDeposit(req,res) {
        const {depositId} = req.params
        const deposit = await PaymentSchema.findById(depositId)
        if(!deposit){
            return res.status(404).json("NO DEPOSITS FOUND")
        }
        res.status(200).json(deposit)
    }
}

module.exports = new DepositService