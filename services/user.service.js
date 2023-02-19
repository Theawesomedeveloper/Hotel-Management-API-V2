const User = require('../models/user.model')

class UserService {

    // create user
    async create (userData) {
        return await User.create(userData);
    }

    // find user 
    async fetchOne(filter){
        return await User.findOne(filter)
    }

    async update(filter, userData){
        return await User.findOneAndUpdate(filter, userData, {new: true})
    }


}
module.exports = new UserService()