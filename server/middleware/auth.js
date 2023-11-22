const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// User Model
const Users = require('../models/User');

function auth(req, res, next) {
    
    try {
         const token = req.headers.authorization;
        //check for token
        if (!token) {res.json({status:false, msg: "No token, authorization denied" })}
        else{
        //verify token
            const decoded = jwt.verify(token, process.env.jwtSecret);
            //add user from payload
            req.user = decoded;
            next();  
        };
        
    } catch (e) {
        res.json({status:false, msg: 'token is not valid' });
    }

}
async function authDetail(req, res, next) {

    try {
         const token = req.headers.authorization;
        //check for token
        if (!token) {res.status(401).send({ status:false, msg: "No token, authorization denied" })}
        else{
        //verify token
            const decoded = await jwt.verify(token, process.env.jwtSecret);
            //add user from payload
            if(decoded.id){
                const user = await Users.findById(decoded.id);
                req.user = user;
                next();  
            }else{
                res.status(401).send({ status:false, msg: "Error Verifying Token, authorization denied" });
            }
        };
        
    } catch (e) {
        console.log(e);
        res.status(400).send({ msg: 'token is not valid' });
    }

}

module.exports = {auth,authDetail};