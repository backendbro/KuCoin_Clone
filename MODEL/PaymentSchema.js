const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    amount:{type:Array},
    balance:{type:Number, default:0},
    user:{ type: mongoose.Schema.Types.ObjectId, ref:'User'} 
}, {timestamps:true})



module.exports = mongoose.model('Payment', PaymentSchema)