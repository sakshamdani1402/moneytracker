const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction')
const fetchuser = require("../middleware/fetchuser")

// ROUTE 1 : GET ALL TRANSACTIONS "/transactions/getall"

router.get('/getall', fetchuser, async function(req, res){
    try{
        const userId = req.user;
        const transactionList = await Transaction.find({user : userId});
        res.json(transactionList);
    }catch(err){
        res.status(500).send("internal server error");
    }
})

// ROUTE 2 : ADD A TRANSACTION "/transactions/getall"
router.post('/add', fetchuser, async (req, res) => {
    try {
        const { name, amount} = req.body;
        //if errors occured during validation, return bad req and the errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        //if there are no errors then create a new note
        const transaction = new Transaction({
            name, amount, user: req.user
        })
        //save the note
        const savedTransaction = await transaction.save();
        res.json(savedTransaction);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3 : DELETE A TRANSACTION "/transactions/delete"
router.delete('/delete/:id', fetchuser, async function (req, res) {
    try{
        let transaction = await Transaction.findById(req.params.id);
        if(!transaction) res.status(404).send("not found");

        if(transaction.user.toString() !== req.user) 
            res.status(401).send("not allowed")

        transaction = await Transaction.findByIdAndDelete(req.params.id);

        res.send("note deleted successfully");
    }catch(err){
        res.status(500).send("Internal server error");
    }
})
module.exports = router