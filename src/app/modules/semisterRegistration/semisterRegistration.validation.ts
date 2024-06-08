import Joi from "joi";


const createSemisterRegistrationValidationSchema = Joi.object({
   academidSemister: Joi.string()
                        .required()
                        .messages({
                            'any-required': "Academic Semiter is required"
                        }),
    status: Joi.string()
               .valid("UPCOMING","ONGOING","ENDED")
               .optional()
               .messages({
                'any.only': '{#label} is not supported',
               }),
    startDate: Joi.date(),
    endDate: Joi.date(),
    minCredit: Joi.number(),
    maxCredit: Joi.number(),
     
})

const updateSemisterRegistrationValidationSchema = Joi.object({
    academidSemister: Joi.string()
                         .optional(),
    status: Joi.string()
               .valid("UPCOMING","ONGOING","ENDED")
               .optional()
               .messages({
                'any.only': '{#label} is not supported',
               }),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    minCredit: Joi.number().optional(),
    maxCredit: Joi.number().optional(),
})

export const SemisterRegistrationValidation = {
    createSemisterRegistrationValidationSchema,
    updateSemisterRegistrationValidationSchema
}