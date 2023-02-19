require('dotenv').config()

// Middleware function for authorization based on user role
function authorize(role) {
    return function (req, res, next) {
        
        
        if (req.user.role !== role) {
            return res.status(403).send('Access denied.');
        }

        next();
    };
}

module.exports = authorize