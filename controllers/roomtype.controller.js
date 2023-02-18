const roomTypeService = require('../services/roomtype.service');
const {userSchemaJoiOptional, roomTypeSchemaJoiOptional , roomSchemaJoiOptional} = require('../middlewares/validation.middleware')

class RoomTypeController {

    /**
     * creates a roomtype based on the `request.body`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async createRoomType(req, res) {
        // getting user input
        const roomTypeData = req.body;

        // check if there is a room type with that name
        const existingRoomType = await roomTypeService.fetchOne({ roomType: roomTypeData.roomType });
        if (existingRoomType)
            return res.status(403).json({ success: false, message: "Room type already exists" })

        // if not
        const createdRoomType = await roomTypeService.create(roomTypeData);
        return res.status(201).json({ success: true, message: "Roomtype created successfully", data: createdRoomType })
    }

    /**
     * fetches a roomtype based on the `request.params`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async fetchOneRoomType(req, res) {
        const requestedRoomType = req.params;

        // check if there the room type exists
        const foundRoomType = await roomTypeService.fetchOne(requestedRoomType);

        // if not
        if (!foundRoomType)
            return res.status(404).json({ success: false, message: "Roomtype not found" });

        return res.status(200).json({ success: true, message: "Roomtype fetched successfully", data: foundRoomType })
    }

    /**
      * fetches all roomtypes based on the `request.query`
      * @param {*} req 
      * @param {*} res 
      * @returns 
      */
    async fetchAllRoomTypes(req, res) {
        // console.log(req);
        const filter = req.query

        const foundRoomTypes = await roomTypeService.fetchAll(filter);
        if (!foundRoomTypes)
            return res.status(404).json({ success: false, message: "No Roomtypes found" });

        return res.status(200).json({ success: true, message: "Roomtypes fetched successfully", data: foundRoomTypes })
    }

    /**
     * deletes a `roomtype` based on the `request.params`
     * @returns { object }
     */
    async deleteRoomType(req, res) {

        const requestedRoomType = req.params.roomType;

        // checking if such room type exists
        const deletedRoomType = await roomTypeService.delete({ roomType: requestedRoomType });

        if (!deletedRoomType)
            return res.status(404).json({ success: false, message: "Roomtype not found" });

        return res.status(200).json({ success: true, message: "Roomtype deleted successfully", data: deletedRoomType })

    }

    /**
     * updates a `roomtype` based on the `request.params`
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async editRoomType(req, res) {
        // getting user inputs
        const requestedRoomType = req.params.roomType;
        const updateData = req.body;


        // checking if such room type exists
        const existingRoomType = await roomTypeService.fetchOne({ roomType: requestedRoomType });

        if (!existingRoomType)
            return res.status(404).json({ success: false, message: "Roomtype not found" });

        if (updateData.roomType) {

            // check if the new roomtype name has been used
            const existingRoomTypeName = await roomTypeService.fetchOne({ roomType: updateData.roomType });

            if (existingRoomTypeName)
                return res.status(403).json({ success: false, message: "Roomtype already exists" })
        }

        const updatedRoomType = await roomTypeService.edit({ roomType: requestedRoomType }, updateData);
        return res.status(200).json({ success: true, message: "Roomtype updated successfully", data: updatedRoomType })


    }


}

module.exports = new RoomTypeController()