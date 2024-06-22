import Joi from "joi";


const createEnrolledCourseValidationSchema = Joi.object({
    offeredCourse: Joi.string()
                      .required()
})

const updatedEnrolledCourseValidationSchema = Joi.object({
    semisterRegistration: Joi.string(),
    offeredCourse: Joi.string(),
    student: Joi.string(),
    courseMarks: Joi.object({
    classTest1: Joi.number(),
    midTerm: Joi.number(),
    classTest2: Joi.number(),
    finelTerm: Joi.number()
   }) 
})

export const EnrolledCourseValidation = {
    createEnrolledCourseValidationSchema,
    updatedEnrolledCourseValidationSchema
}