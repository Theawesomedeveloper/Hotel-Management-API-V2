const roomService = require('../services/room.service');
const roomTypeService = require('../services/roomtype.service');
const { userSchemaJoiOptional, roomTypeSchemaJoiOptional, roomSchemaJoiOptional } = require('../middlewares/validation.middleware')


/**
 * @class
 */
class RoomController {

    /**
     * Creates a room with the data in the `req.body`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createRoom(req, res) {

        // get room data from the requests body
        const roomData = req.body;

        // check if room already exists
        const existingRoom = await roomService.fetchOne({ roomData });

        if (existingRoom)
            return res.status(409).json({ success: false, message: "room already exists" });

        const roomType = await roomTypeService.fetchOne({ roomType: roomData.roomType });

        if (!roomType)
            return res.status(404).json({ success: false, message: "roomtype does not exist" })

        // getting the id of the roomtype and adding it to the roomtype data
        roomData.roomType = roomType._id

        const createdRoom = await roomService.create(roomData);
        return res.status(201).json({ success: true, message: "room created sucessfully", data: createdRoom })
    }

    /**
     * deletes a room with the data gotten from the `req.params`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async deleteRoom(req, res) {
        const requestedRoom = req.params

        const { error, value } = roomSchemaJoiOptional.validate(requestedRoom);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const deletedRoom = await roomService.delete({ requestedRoom });

        // check if the room exists
        if (!deletedRoom)
            return res.status(404).json({ success: false, message: "Room not found" });

        return res.status(200).json({ success: true, message: "room deleted successfully", data: deletedRoom });
    }


    /**
     * fetches a room based on the `request.params`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async fetchOneRoom(req, res) {
        const requestedRoom = req.params;

        const { error, value } = roomSchemaJoiOptional.validate(requestedRoom);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        // check if room exists
        const foundRoom = await roomService.fetchOne({ requestedRoom })

        if (!foundRoom)
            return res.status(404).json({ success: false, message: "Room not found" });

        return res.status(200).json({ success: true, message: "room fetched successfully", data: foundRoom });
    }

    /**
     * fetches a room based on the `request.query`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async fetchAllRooms(req, res) {
        const { error, value } = roomSchemaJoiOptional.validate(req.query);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }
        let filter
        if (req.query.roomType) {
            filter = {
                roomId: new RegExp("^" + req.query.roomType.slice(0, 3))
            }
        }



        const foundRooms = await roomService.fetchAll(filter);


        if (!foundRooms || foundRooms.length < 1)
            return res.status(404).json({ success: false, message: "no rooms found" });

        return res.status(200).json({ success: true, message: "rooms fetched successfully", data: foundRooms });

    }


    /**
     * edits a room based on the `request.params` and `request.body`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async editRoom(req, res) {
        const requestedRoom = req.params
        const updateData = req.body

        const { error, value } = roomSchemaJoiOptional.validate(updateData);

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }



        // check if room exists
        const existingRoom = await roomService.fetchOne({ roomId: requestedRoom.roomId });

        if (!existingRoom)
            return res.status(404).json({ success: false, message: "Room not found" });

        // check if user wants to edit the roomId  to an existing roomId
        if (updateData.roomId) {

            const existingRoomId = await roomService.fetchOne({ roomId: updateData.roomId });

            if (existingRoomId)
                return res.status(403).json({ success: false, message: "Room already exists" });
        }

        // check if user wants to edit the roomId  and roomType 

        if (updateData.roomType) {
            const existingRoomType = await roomTypeService.fetchOne({ roomType: updateData.roomType });

            if (!existingRoomType)
                return res.status(404).json({ success: false, message: "Room type does not exist" })

            updateData.roomType = existingRoomType._id;
        }



        // if not any of the above 
        const updatedData = await roomService.edit(requestedRoom, updateData)
        return res.status(200).json({ success: true, message: "Room updated successfully", data: updatedData })


    }
}
/**
 * an instance of the `RoomController Class`
 * @exports
 */
module.exports = new RoomController()