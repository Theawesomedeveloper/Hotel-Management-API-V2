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


}
module.exports = new UserService()