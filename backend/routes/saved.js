const express = require('express');
const router = express.Router();
const SavedTransaction = require('../models/SavedTransaction');
const fetchuser = require("../middleware/fetchuser");
const { json } = require('express');

//ROUTE 1 : GET ALL SAVED TRANSACTIONS "/saved/getall"

router.get('/getall', fetchuser, async function(req, res){
    try {
       const userId = req.user;
       const savedList = await SavedTransaction.find({user : userId});
       res.json(savedList);
    } catch (err) {
        console.log(err);
        res.status(500).send("internal server error")
    }
})

//ROUTE 2 : SAVE TRANSACTION STATE "saved/add"
router.post('/add', fetchuser, async function (req, res) {
    try {
        const {name, income, expense} = req.body;
        const userId = req.user;
        const savedState = new SavedTransaction({
            name, income, expense, user : userId
        });
        const newSave = await savedState.save();
        res.json(newSave);
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server err');
    }
})

// ROUTE 3 : DELETE SAVED TRANSACTION STATE 'saved/delete/:id'

router.delete('/delete/:id', fetchuser, async (req, res) =>{
    try {
        const id = req.params.id;
        const userId = req.user;
        let deletedState = await SavedTransaction.findById(id);
        
        if(!deletedState) 
            res.status(404).send('not found');
        if(deletedState.user.toString() !== userId)
            res.status(401).send('not allowed');
        
        await SavedTransaction.findByIdAndDelete(id);
        res.json("saved transaction deleted successfully");
    } catch (err) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router;

