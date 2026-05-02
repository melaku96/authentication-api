import joi from 'joi'

export const registerJoi = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().min(6).required().trim()
})