const { Schema, model, default: mongoose } = require('mongoose');
const RoomType = require('./roomtype.model')

const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType'
    }
});

const Room = model('Room', roomSchema);
module.exports = Room;