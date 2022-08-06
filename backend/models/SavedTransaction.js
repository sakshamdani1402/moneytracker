const mongoose = require('mongoose')
const {Schema} = mongoose

const SavedTransactionSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    income:{
        type:Number,
        required:true
    },
    expense :{
        type : Number,
        required: true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const SavedTransaction = mongoose.model('SavedTransaction',SavedTransactionSchema);
module.exports = SavedTransaction;