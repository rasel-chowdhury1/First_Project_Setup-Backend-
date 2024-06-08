import Joi from "joi";
import { Days } from "./offeredCourse.interface";


const createOfferedCourseValidationSchema = Joi.object({
    semisterRegistration: Joi.string()
                             .required()
                             .messages({
                                'any-required': "Semister Registration is required"
                            }),
    academicSemister: Joi.string()
                        .required()
                        .messages({
                        'any-required': "Academic semister is required"
                    }),
    academicFaculty: Joi.string()
                        .required()
                        .messages({
                        'any-required': "AcademicFaculty is required"
                    }),
    academicDepartment: Joi.string()
                            .required()
                            .messages({
                            'any-required': "Academic Department is required"
                        }),
    course: Joi.string()
                .required()
                .messages({
                'any-required': "Course is required"
            }),
    faculty: Joi.string()
                .required()
                .messages({
                'any-required': "Faculty is required"
            }),
    maxCapacity: Joi.number().required(),
    section: Joi.number().required(),
    days: Joi.string()
             .valid(Days),
    startTime: Joi.string()
                  .required(),
    endTime: Joi.string()
                .required()
})

const updateOfferedCourseValidationSchema = Joi.object({
    faculty: Joi.string()
                .required()
                .messages({
                'any-required': "Faculty is required"
            }),
    maxCapacity: Joi.number().required(),
    section: Joi.number().required(),
    days: Joi.string()
             .valid(Days),
    startTime: Joi.string()
                  .required(),
    endTime: Joi.string()
                .required()
})

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}