
const Joi = require('joi');

const roomSchemaJoi = Joi.object({
    roomId: Joi.string().required(),
    roomType: Joi.string().required()
})

const roomTypeSchemaJoi = Joi.object({
    roomType: Joi.string().required(),
    bedType: Joi.string().required(),
    maxOccupancy: Joi.number().required(),
    pricePerNight: Joi.number().required(),
    amenities: Joi.array().items(Joi.string())
});

const userSchemaJoi = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(0).required(),
    role: Joi.string().valid('guest', 'admin'),
});






const validateUserInput = function (type) {
    return function (req, res, next) {
        const userInput = req.body;
        let result

        if (type === "roomtype") {
            result = roomTypeSchemaJoi.validate(userInput)
        }
        else if (type === "room") {
            result = roomSchemaJoi.validate(userInput)
        }
        else if (type === "user") {
            result = userSchemaJoi.validate(userInput)
        }
        else {
            return res.status(422).json({ success: false, message: "internal server error" })
        }

        
        const { error, value } = result;

        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        next()

    }
}

const roomSchemaJoiOptional = Joi.object({
    roomId: Joi.string(),
    roomType: Joi.string()
})

const roomTypeSchemaJoiOptional = Joi.object({
    roomType: Joi.string(),
    bedType: Joi.string(),
    maxOccupancy: Joi.number(),
    pricePerNight: Joi.number(),
    amenities: Joi.array().items(Joi.string())
});

const userSchemaJoiOptional = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(0),
    role: Joi.string().valid('guest', 'admin'),
});



module.exports = {validateUserInput,userSchemaJoiOptional, roomTypeSchemaJoiOptional , roomSchemaJoiOptional}