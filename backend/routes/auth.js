const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sakshamisagoodboy";
const fetchuser = require("../middleware/fetchuser")

// ROUTE 1 : Create a user using: POST "/api/auth/createuser". Doesnt require auth
router.post('/register', [
    
    //u can put custom mssg after "email" in below method    
    body('email', 'Enter valid email').isEmail(),
    
    // password must be at least 5 chars long    
    body('password', 'pasword shoould be min 4 characters').isLength({ min: 4 })

], async(req, res) => {
        const user = req.body;

        const takenEmail = await User.findOne({email : user.email});
        if(takenEmail){
            res.json({message : "user already exists"});
        }
        else{
            user.password = await bcrypt.hash(req.body.password, 10);
            const newUser =  User.create({
                email : user.email,
                password : user.password
            });
            res.json({success : true, newUser});
            //const data = {newUser : newUser.id};
            //const authToken = jwt.sign(data,JWT_SECRET);
            //res.json({message : "success", authToken});
        }

    } 
)

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". No login req
router.post('/login', [

    //u can put custom mssg after "email" in below method    
    body('email', 'Enter valid email').isEmail(),
    // password exists    
    body('password', 'password cannot be blank').exists(),
], async(req, res) => {

    //if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message : "validation error", errors: errors.array() });
    }
    //destructure email and password from the req body
    const {email,password} = req.body;
    try {
        //find a user with the email
        let user = await User.findOne({email});
        //if no user is found
        if(!user){
            return res.status(400).json({
                error:"Login with correct credentials"
            });
        }
        //here user with the enail is found
        //so compare the passwords
        const passwordCompare =await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({ message : "login error", 
                error:"Login with correct credentials"
            });
        }
        //passwords match
        const data ={
            user : user._id
        }
        // sign auth token with data(user id) and the JWT_SECRET
        const authToken = jwt.sign(data,JWT_SECRET);
        //success = true;
        res.json({success : true, authToken});
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3 : Get logged in user details using: POST "/api/auth/getuser". login req 
router.post('/getuser',fetchuser, async(req, res) => {
    try {
        const userId = req.user;
        console.log(userId);
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});
module.exports = router;