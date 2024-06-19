import Joi from "joi";

const userValidationSchema = Joi.object({
    password: Joi.string().max(20).optional().messages({
        'string.base': 'Password must be a string',
        'string.max': 'Password can not be 20 characters',
    }),
    
})

const changeStatusValidationSchema = Joi.object({
    status: Joi.string()
               .valid('in-progress' , 'blocked')
               .messages({
                'any.only': '{#label} is not a valid status',
              }),
})

export const UserValidation = {
    userValidationSchema,
    changeStatusValidationSchema
};