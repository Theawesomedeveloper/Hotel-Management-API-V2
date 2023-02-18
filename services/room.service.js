const Room = require('../models/room.model');


class RoomService {
    // create a room
    async create(roomData) {
        return await Room.create(roomData)
    }

    // edit a room
    async edit (filter, updateData) {
        return await Room.findOneAndUpdate(filter, updateData, {new : true});
    }

    // delete a room
    async delete (filter){
        return await Room.findOneAndDelete(filter)
    }

    // fetch a room 
    async fetchOne (filter){
        return await Room.findOne(filter, {__v: 0}).populate('roomType')
    }

    // fetch all rooms
    async fetchAll(filter) {
        console.log(filter);
        
        return await Room.find(filter, {__v: 0}).populate('roomType')
    }
}

module.exports = new RoomService()