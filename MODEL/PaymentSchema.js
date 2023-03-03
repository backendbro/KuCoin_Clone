const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    amount:{
        type:Array,
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    user:{ type: mongoose.Schema.Types.ObjectId, ref:"User"}
}, {timestamps:true})


PaymentSchema.methods.topUpBalance = function (amount) {
    this.balance = this.balance + amount
    return this.balance

}


module.exports = mongoose.model('Payment', PaymentSchema)