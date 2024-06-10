import Joi, { custom } from "joi";
import { Days } from "./offeredCouse.interface";


const createOfferedCourseValidationSchema = Joi.object({
    semisterRegistration: Joi.string()
                             .required()
                             .messages({
                                'any-required': "Semister Registration is required"
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
    days: Joi.array()
             .items(Joi.string()
             .valid(...Days)),
    startTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                .required()
                .messages({
                'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                'any.required': 'The time is required'
                }),
    endTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                .required()
                .messages({
                'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                'any.required': 'The time is required'
                })
}).custom((value, helpers) => {
    if (value.startTime >= value.endTime) {
      return helpers.message({
        custom: 'Start Time should be before End Time'
      });
    }
    return value;
  });

const updateOfferedCourseValidationSchema = Joi.object({
    faculty: Joi.string(),
    maxCapacity: Joi.number(),
    section: Joi.number(),
    days: Joi.array()
            .items(Joi.string()
            .valid(...Days)),
    startTime: Joi.string()
                  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                  .required()
                  .messages({
                  'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                  'any.required': 'The time is required'
                  }),
    endTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                .required()
                .messages({
                'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                'any.required': 'The time is required'
                })
}).custom((value, helpers) => {
  if (value.startTime >= value.endTime) {
    return helpers.message({
      custom: 'Start Time should be before End Time'
    });
  }
  return value;
});

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}