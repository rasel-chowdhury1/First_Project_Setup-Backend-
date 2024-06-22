import Joi from "joi";
import { BloodGroup, Gender } from "./faculty.constrant";

// Validation schema for user name
const createUserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(20)
    .pattern(/^[A-Z]/)
    .messages({
      'string.pattern.base': 'First Name must start with a capital letter',
    }),
  middleName: Joi.string(),
  lastName: Joi.string(),
});

const updateUserNameValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(20).optional(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});

// Validation schema for creating faculty
const createFacultyValidationSchema = Joi.object({
  password: Joi.string().max(20),
  faculty: Joi.object({
    designation: Joi.string(),
    name: createUserNameValidationSchema,
    gender: Joi.string().valid(...Gender),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email(),
    contactNo: Joi.string(),
    emergencyContactNo: Joi.string(),
    bloodGroup: Joi.string().valid(...BloodGroup),
    presentAddress: Joi.string(),
    permanentAddress: Joi.string(),
    academicDepartment: Joi.string(),
    profileImg: Joi.string(),
  }),
});

// Validation schema for updating faculty
const updateFacultyValidationSchema = Joi.object({
  faculty: Joi.object({
    designation: Joi.string().optional(),
    name: updateUserNameValidationSchema,
    gender: Joi.string().valid(...Gender).optional(),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().optional(),
    contactNo: Joi.string().optional(),
    emergencyContactNo: Joi.string().optional(),
    bloodGroup: Joi.string().valid(...BloodGroup).optional(),
    presentAddress: Joi.string().optional(),
    permanentAddress: Joi.string().optional(),
    profileImg: Joi.string().optional(),
    academicDepartment: Joi.string().optional(),
  }),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
