const DepositSchema = require('../model/DepositSchema')
const UserSchema = require('../model/UserSchema')
const WithDrawalSchema = require('../model/WithDrawalSchema')

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
        
        const depositObj = {amount, user:userId}

        const findDepositLedger = await DepositSchema.findOne({user})
        const findConfirmedWithDrawal = await WithDrawalSchema.find({status:"Confirmed"})


        if(findDepositLedger){
            
            let confirmedAmt = 0;
            let balance = amount

            findDepositLedger.amount.forEach(amount => {
                balance = balance + amount
            })

            if(findConfirmedWithDrawal){
                findConfirmedWithDrawal.forEach(confirmed => {
                    confirmedAmt = confirmed.amount + confirmedAmt
                })
            }

            balance = balance - confirmedAmt
           
            const newDeposit = await DepositSchema.findByIdAndUpdate(findDepositLedger.id, {$push:{amount}, balance}, {new:true})
            return res.status(200).json({newDeposit})
        }

        const deposit = await DepositSchema.create(depositObj)
        const newBalance = amount
        await DepositSchema.findByIdAndUpdate(deposit.id, {balance:newBalance}, {new:true})

        res.status(201).json({deposit})
    }

    async getSingleDeposit(req,res) {
        const {depositId} = req.body
        const deposit = await DepositSchema.findById(depositId)
        if(!deposit){
            return res.status(404).json("NO DEPOSITS FOUND")
        }
        res.status(200).json(deposit)
    }

  
}

module.exports = new DepositService