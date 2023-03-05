const DepositSchema = require('../model/DepositSchema')
const UserSchema = require('../model/UserSchema')

class DepositService {
    
    async getDeposits (req,res) {
        const deposits = await DepositSchema.find()
        if(!deposits){
            return res.status(404).json("NO DEPOSITS FOUND")
        }
        res.status(200).json(deposits)
    }

    async  makeDeposit(req,res) {
       
        const {amt, userId} = req.body 
        const user = await UserSchema.findById(userId)
        const amount = parseInt(amt)
        
        const depositObj = {amount, user}
        const findDepositLedger = await DepositSchema.findOne({user})
        if(findDepositLedger){
           
            let balance = amount
            findDepositLedger.amount.forEach(amount => {
                balance = balance + amount
            })

            const newDeposit = await DepositSchema.findByIdAndUpdate(findDepositLedger.id, {$push:{amount}, balance}, {new:true})
            return res.status(200).json({newDeposit})
        }

        const deposit = await DepositSchema.create(depositObj)

        res.status(201).json({deposit})
    }

    async getSingleDeposit(req,res) {
        const {depositId} = req.params
        const deposit = await DepositSchema.findById(depositId)
        if(!deposit){
            return res.status(404).json("NO DEPOSITS FOUND")
        }
        res.status(200).json(deposit)
    }
}

module.exports = new DepositService