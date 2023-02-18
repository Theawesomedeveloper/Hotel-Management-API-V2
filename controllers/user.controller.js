require('dotenv').config()
const userService = require('../services/user.service');
const { userSchemaJoiOptional } = require('../middlewares/validation.middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


/**
 * @class
 */
class UserController {
    // create a user
    async createUser(req, res) {
        const userData = req.body

        // check if user with that email exists
        const existingUser = await userService.fetchOne({ email: userData.email });
        if (existingUser)
            return res.status(403).json({ success: false, message: "User with that email already exists" });


        // hashing users password 
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {


            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            // saving it along side the hash in the database
            userData.password = hash
            const createdUser = await userService.create(userData)


            // Generate JWT token
            const token = jwt.sign({ id: createdUser._id, role: createdUser.role }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });


            // Authorizing user
            res.header('Authorization', token).status(201).json({ success: true, token, message:"user created successfully", data: { email: createdUser.email, role: createdUser.role } });



        });

    }

    async fetchUser(req, res) {
        const userData = req.body;

        // check if user with that email exists
        const foundUser = await userService.fetchOne({ email: userData.email });
        if (!foundUser)
            return res.status(401).json({ success: false, message: "Invalid email or password" });

        // Check if password is correct
        const validPassword = await bcrypt.compare(userData.password, foundUser.password);

        if (!validPassword)
            return res.status(401).send('Invalid email or password.');

        // Generate JWT token
        const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_IN });


        res.header('Authorization', token).status(200).json({ success: true, token, data: { email: foundUser.email, role: foundUser.role } });



    }
}

module.exports = new UserController()