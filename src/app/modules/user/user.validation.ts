import Joi from "joi";

const userValidationSchema = Joi.object({
    password: Joi.string().max(20).optional().messages({
        'string.base': 'Password must be a string',
        'string.max': 'Password can not be 20 characters',
    }),
    
})

export default userValidationSchema;