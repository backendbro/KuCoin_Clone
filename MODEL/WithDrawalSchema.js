const {Schema, model} = require('mongoose')

const WithdrawalSchema = Schema ({
    user:{ type: Schema.Types.ObjectId, ref:'User'},
    deposit:{ type: Schema.Types.ObjectId, ref:'Deposit'},
    amount:{type:Array}
})

module.exports = model("WithDrawal", WithdrawalSchema)