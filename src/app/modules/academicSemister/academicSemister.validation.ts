import Joi from "joi";
import { Months } from "./academicSemister.model";



const createAcademicValidationSchema = Joi.object({
    name: Joi.string()
             .valid('Autumn','Summer','Fall')
             .required()
             .messages({
                'string.base': 'Name value must be string',
                'any.only': '{#label} is not a valid name',
                'any.required': 'Name is required'
             }),
    code: Joi.string()
             .valid('01','02','03')
             .required()
             .messages({
                'string.base': 'Code must be string',
                'any.only': '{#label} is not a valid code',
                'any.required': 'Code is required'
             }),
    year: Joi.string()
             .required()
             .messages({'string.base':'Year must be a string','any.required':'Year is required'}),
    startMonth: Joi.string()
                   .valid(...Months)
                   .messages({
                    'any.only': '{#label} is not a valid month',
                    'any.required': 'StartMonth is required.'
                   }),
    endMonth: Joi.string()
                .valid(...Months)
                .messages({
                'any.only': '{#label} is not a valid month',
                'any.required': 'StartMonth is required.'
                })
    
})

const updateAcademicValidationSchema = Joi.object({
   name: Joi.string()
            .valid('Autumn','Summer','Fall')
            .required()
            .messages({
               'string.base': 'Name value must be string',
               'any.only': '{#label} is not a valid name',
               'any.required': 'Name is required'
            }),
   code: Joi.string()
            .valid('01','02','03')
            .optional()
            .messages({
               'string.base': 'Code must be string',
               'any.only': '{#label} is not a valid code',
              
            }),
   year: Joi.string()
            .optional()
            .messages({'string.base':'Year must be a string','any.required':'Year is required'}),
   startMonth: Joi.string()
                  .valid(...Months)
                  .optional()
                  .messages({
                   'any.only': '{#label} is not a valid month',
                   'any.required': 'StartMonth is required.'
                  }),
   endMonth: Joi.string()
               .valid(...Months)
               .optional()
               .messages({
               'any.only': '{#label} is not a valid month',
               'any.required': 'StartMonth is required.'
               })
   
})

export const academicValidationSchema = {
    createAcademicValidationSchema,
    updateAcademicValidationSchema
}