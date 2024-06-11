import Joi from "joi";


const loginValidationSchema = Joi.object({
    id: Joi.string()
           .required()
           .messages({'any.required': 'id is required'}),
    password: Joi.string()
           .required()
           .messages({'any.required': 'password is required'})
})

const changePasswordValidationSchema = Joi.object({
    oldPassword: Joi.string()
           .required()
           .messages({'any.required': 'old password is required'}),
    newPassword: Joi.string()
           .required()
           .messages({'any.required': 'new password is required'})
})


export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema
}