import Joi, { boolean } from 'joi';



//creating a schema validation using joi

// Joi schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .message('"firstName" must be capitalized')
    .required()
    .messages({
      'string.base': '"firstName" should be a type of string',
      'string.empty': '"firstName" cannot be an empty field',
      'string.max': '"firstName" can not be more than 20 characters',
      'any.required': '"firstName" is required',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .message('"lastName" should only contain alphabetic characters')
    .required()
    .messages({
      'string.base': '"lastName" should be a type of string',
      'string.empty': '"lastName" cannot be an empty field',
      'any.required': '"lastName" is required',
    }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'any.required': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': "Mother's contact number is required",
  }),
});

// Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    'any.required': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'any.required': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    'any.required': "Local guardian's address is required",
  }),
});

// Joi schema for Student
const CreateStudentValidationSchema = Joi.object({
  // id: Joi.string().max(20).required().messages({
  //   'any.required': 'Student ID is required',
  // }),
  // password: Joi.string().required().messages({
  //   'any.required': 'password is required',
  // }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': '{#label} is not supported',
      'any.required': 'Gender is required',
    }),
  dateOfBirth: Joi.date().iso().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#label} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.optional(),
  admissionSemister: Joi.string(),
  profileImg: Joi.string().optional(),
  // isActive: Joi.string()
  //   .valid('active', 'inactive')
  //   .default('active')
  //   .messages({
  //     'any.only': '{#label} must be one of [active, inactive]',
  //   }),
  //   isDeleted: Joi.boolean()
});

export const studentValidations = {
  CreateStudentValidationSchema,
};
