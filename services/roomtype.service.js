const RoomType = require('../models/roomtype.model')

class RoomTypeService {

    // create a room type
    async create(roomTypeData) {
        return await RoomType.create(roomTypeData)
    }

    // edit a room type

    async edit(filter, updateData) {
        return await RoomType.findOneAndUpdate(filter, updateData, { new: true });
    }

    // delete a room type
    async delete(filter) {
        return await RoomType.findOneAndDelete(filter);
    }

    // fetch a roomtype
    async fetchOne(filter) {
        return await RoomType.findOne(filter, { __v: 0 });
    }


    // fetch all roomtype
    async fetchAll(filter) {
        return await RoomType.find(filter, { __v: 0 });
    }
}

module.exports = new RoomTypeService();