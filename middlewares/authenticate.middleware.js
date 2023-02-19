require('dotenv').config()
const jwt = require('jsonwebtoken')
const util = require('util')

// Middleware function for authentication
function authenticate(req, res, next) {
    // const token = req.header('Authorization');
    // const token = req.header.authorization
    // const token = res.get('Authorization')
    // const token = req.header('x-auth-token')
    // boss you sef don see say i try 


    try {

        const token = req.headers.cookie?.slice(11)



        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. you need to Login' });
        }


        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded;

        next();


    } catch (error) {
        console.error(error)
        return res.status(400).json({ success: false, message: 'Session expired, you need to Login' });
    }



}

module.exports = authenticate