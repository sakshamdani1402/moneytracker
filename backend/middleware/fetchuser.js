const jwt = require('jsonwebtoken');
const JWT_SECRET = "sakshamisagoodboy";

const fetchuser = (req,res,next) =>{
    // Get user from the jwt token ans add id to req object
    const token = req.header('authToken');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}
module.exports = fetchuser;