// import { Schema, model } from 'mongoose';
// import {
//   Guardian,
//   LocalGuardian,
//   Student,
//   UserName,
// } from './student.interface';

// // 2. Create a Schema corresponding to the document interface.
// const userNameSchema = new Schema<UserName>({
//   firstName: { type: String, required:[true, "FirstName is required"] },
//   middleName: { type: String },
//   lastName: { type: String, required: [true, "LastName is required"] },
// });

// const guardianSchema = new Schema<Guardian>({
//   fatherName: { type: String, required: true },
//   fatherOccupation: { type: String, required: true },
//   fatherContactNo: { type: String, required: true },
//   motherName: { type: String, required: true },
//   motherOccupation: { type: String, required: true },
//   motherContactNo: { type: String, required: true },
// });

// const localGuardianSchema = new Schema<LocalGuardian>({
//   name: { type: String, required: true },
//   occupation: { type: String, required: true },
//   contactNo: { type: String, required: true },
//   address: { type: String, required: true },
// });

// const studentSchema = new Schema<Student>({
//   id: { type: String, required: true, unique: true },
//   name: {
//     type: userNameSchema,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female','other'],
//       message: '{VALUE} not supported'
//     },
//     required: [ true, ""],
//   },
//   dateOfBirth: { type: String },
//   email: { type: String, required: true, unique: true },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: { type: String, required: true },
//   bloodGroup: { 
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'Ó-']
//    },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   guardian: {
//     type: guardianSchema,
//     required: true
//   },
//   localGuardian: localGuardianSchema,
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'inActive'],
//     default: 'active'
//   },
// });

// // 3. Create a Model.
// export const StudentModel = model<Student>('Student', studentSchema);



import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  // StudentMethods,
  TStudentModel,
  UserName,
} from './student.interface';

import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<UserName>({
  firstName: { 
    type: String, 
    required: [true, "First name is required"],
    maxlength: [20, 'firstName can not be more than 20 characters'],
    trim: true, // we do trim: true, then first and last er white space bad diye dibe
    
    //custom validator
    validate: {
      validator: function(value: string){
        const val = value.trim()
        const firstNameStr = val.charAt(0).toUpperCase() + val.slice(1)
        return firstNameStr === val
      },
      message: '{VALUE} is not capitalize formet'
    }
  },
  middleName: { type: String },
  lastName: { 
    type: String, 
    required: [true, "Last name is required"],
    
    //using validator library
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not alpha'
    }
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { 
    type: String, 
    required: [true, "Father's name is required"] 
  },
  fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
  fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: { type: String, required: [true, "Mother's occupation is required"] },
  motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
  contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
  address: { type: String, required: [true, "Local guardian's address is required"] },
});

//const studentSchema = new Schema<Student, TStudentModel, StudentMethods>//it is instance method
const studentSchema = new Schema<Student, TStudentModel>({
  id: { 
    type: String, 
    required: [true, "Student ID is required"], 
    unique: true 
  },
  user: {
    type: Schema.Types.ObjectId, 
    required: [true, "User object id is required."],
    unique: true,
    ref: 'User'
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"]
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported'
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, "Email is required"], unique: true },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  emergencyContactNo: { type: String, required: [true, "Emergency contact number is required"] },
  bloodGroup: { 
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group'
    }
  },
  presentAddress: { type: String, required: [true, "Present address is required"] },
  permanentAddress: { type: String, required: [true, "Permanent address is required"] },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"]
  },
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, "academicDepartment object id is required"],
    unique: true,
    ref: "AcademicDepartment"
  },
  admissionSemister: {
    type: Schema.Types.ObjectId,
    required: [true, "admissionSemister object id is required."],
    unique: true,
    ref: 'AcademicSemister'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
});


//virtuals
studentSchema.virtual("fullName").get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})


//this is document middelware
// pre save middelware/hood : will work on create() save()
studentSchema.pre('save', async function(next){
  // console.log('pre hook we will save data -> ',this)
  
  const user = this;
  //hashing password and save into db
  // user.password = await bcrypt.hash(user.password, Number(config.bcrypt_sold_rounds) )
  next()
})

// post save middelware/hook : worked on create() save()
studentSchema.post('save', function(doc, next){
  // doc.password = ''
  // console.log('post hook we saved data -> ', this)
  next()
})


//Query Middelware
studentSchema.pre('find', function(next){
  // console.log('find midelware -> ',this)

  this.find({isDeleted: {$ne: true}})

  next()
})

studentSchema.pre('findOne', function(next){
  // console.log('find midelware -> ',this)

  this.find({isDeleted: {$ne: true}})

  next()
})

studentSchema.pre('aggregate', function(next){
   this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
})

//creating a custom static method

studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await StudentModel.findOne({id: id})
  
  return existingUser;
}


// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id:string){
//   const existingUser = await StudentModel.findOne({id: id})

//   return existingUser;
// }



// 3. Create a Model.
export const StudentModel = model<Student, TStudentModel>('Student', studentSchema);
