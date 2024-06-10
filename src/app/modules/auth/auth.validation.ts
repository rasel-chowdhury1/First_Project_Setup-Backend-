import Joi from "joi";


const loginValidationSchema = Joi.object({
    id: Joi.string()
           .required()
           .messages({'any.required': 'id is required'}),
    password: Joi.string()
           .required()
           .messages({'any.required': 'password is required'})
})


export const AuthValidation = {
    loginValidationSchema
}