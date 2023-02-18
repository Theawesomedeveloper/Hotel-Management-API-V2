const {Schema, model} = require('mongoose');


const roomTypeSchema = new Schema({
    roomType: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    bedType: {
        type: String,
        required: true,
        trim: true
    },
    maxOccupancy: {
        type: Number,
        required: true,
        trim: true
    },
    pricePerNight: {
        type: Number,
        required: true,
        trim: true
    },
    amenities : {
        type: [String]
    }

});

const RoomType = model('RoomType', roomTypeSchema);
module.exports = RoomType
