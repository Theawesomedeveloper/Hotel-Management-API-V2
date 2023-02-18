const { Schema, model } = require('mongoose')

// Define User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest',
    },

});

const User = model('User', userSchema)

module.exports = User
