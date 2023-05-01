const Joi = require("joi");


const addtransferValidation = {
    body: Joi.object().required().keys({
        fromUserId: Joi.string().required().min(24).max(24),
        toUserId: Joi.string().required().min(24).max(24),
        amount: Joi.number().required()
    })
}
const getUserTransfersValidation = {
    params: Joi.object().required().keys({
        userId: Joi.string().required().min(24).max(24)
    })
}



module.exports = {
    addtransferValidation,
    getUserTransfersValidation
}