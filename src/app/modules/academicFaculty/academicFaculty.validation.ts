import Joi from "joi";

const createAcademicFacultyValidationSchema = Joi.object({
    name: Joi.string()
             .required()
             .messages({
                'string.base': 'Name value must be string',
                'any.required': 'Name is required'
             })
})

export const academicFacultyValidationSchema = {
    createAcademicFacultyValidationSchema
}