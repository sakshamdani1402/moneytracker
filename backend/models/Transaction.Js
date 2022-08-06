const mongoose = require('mongoose')
const {Schema} = mongoose

const TransactionSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const Transaction = mongoose.model('Transaction',TransactionSchema);
module.exports = Transaction;