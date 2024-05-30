import Joi from "joi";


const createAcademicDepartmentValidation = Joi.object({
    name: Joi.string()
             .required()
             .messages({
                'string.base':'Name must be a string',
                'any.required': 'Name is required'
             }),
    academicFaculty: Joi.string()
                        .required()
                        .messages({
                        'string.base':'AcademicFaculty must be a string',
                        'any.required': 'AcademicFaculty is required'
                        })
})

const updateAcademicDepartmentValidation = Joi.object({
    name: Joi.string()
             .optional(),
    academicFaculty: Joi.string()
                        .optional()
})

export const AcademicDepartmentValidaion = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}