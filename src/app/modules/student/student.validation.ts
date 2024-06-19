import Joi from 'joi';



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

const updateUserNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .message('"firstName" must be capitalized')
    .optional(),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .message('"lastName" should only contain alphabetic characters')
    .optional()
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

const updateGuardianValidationSchema = Joi.object({
  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherContactNo: Joi.string().optional(),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.string().optional(),
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

const updateLocalGuardianValidationSchema = Joi.object({
  name: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
});

// Joi schema for Student
const CreateStudentValidationSchema = Joi.object({
      // id: Joi.string().max(20).required().messages({
  //   'any.required': 'Student ID is required',
  // }),
  // password: Joi.string().required().messages({
  //   'any.required': 'password is required',
  // }),
  password: Joi.string().optional(),
  student: Joi.object({
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
    academicDepartment: Joi.string(),
    admissionSemister: Joi.string(),
    // profileImg: Joi.string().optional(),
    // isActive: Joi.string()
    //   .valid('active', 'inactive')
    //   .default('active')
    //   .messages({
    //     'any.only': '{#label} must be one of [active, inactive]',
    //   }),
    //   isDeleted: Joi.boolean()
  })
  
});

// Joi schema for Student
const UpdateStudentValidationSchema = Joi.object({
  name: userNameValidationSchema.optional(),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional(),
  dateOfBirth: Joi.date().iso().optional(),
  email: Joi.string().email().optional(),
  contactNo: Joi.string().optional(),
  emergencyContactNo: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#label} is not a valid blood group',
    }),
  presentAddress: Joi.string().optional(),
  permanentAddress: Joi.string().optional(),
  guardian: guardianValidationSchema.optional(),
  localGuardian: localGuardianValidationSchema.optional(),
  academicDepartment: Joi.string().optional(),
  admissionSemister: Joi.string().optional(),
  profileImg: Joi.string().optional(),
});

export const studentValidations = {
  CreateStudentValidationSchema,
  UpdateStudentValidationSchema
};
