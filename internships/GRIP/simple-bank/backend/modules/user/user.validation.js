const Joi = require("joi");


const updateBalanceValidation = {
    body: Joi.object().required().keys({
        userId: Joi.string().required().min(24).max(24),
        newBalance: Joi.number().required()
    })
}
const getUserValidation = {
    params: Joi.object().required().keys({
        userId: Joi.string().required().min(24).max(24)
    })
}



module.exports = {
    updateBalanceValidation,
    getUserValidation
}