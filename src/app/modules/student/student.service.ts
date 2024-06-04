import mongoose from 'mongoose';
import { Student } from './student.interface';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

//this code use in user module
// const createStudentIntoDB = async (studentData: Student) => {

//   //using custom static method
//   if(await StudentModel.isUserExists(studentData.id)){
//     throw new Error("User already exists")
//   }

//   //create function return a result
//   const result = await StudentModel.create(studentData); // using built in static method of mongoose

//   // const student = new StudentModel();//create a instance
  
//   // if(await student.isUserExists(studentData.id)){
//   //   throw new Error("User already exists")
//   // }
//   // const result = await student.save(); //built in Instance method of mongoose

//   return result;
// };

const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  // console.log("base query -> ", query);
  // const queryObj = {...query};

  // let searchTerm = '';

  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: ['email','name.firstName', 'presentAddress'].map(
  //     (field) => ({
  //       [field]: {$regex: searchTerm, options: 'i'}
  //     })
  //   )
  // })

  // //filtering
  // const excludeFileds = ['searchTerm'];

  // excludeFileds.forEach((ele) => delete queryObj[ele])

  // console.log({query, queryObj})

  const result = await StudentModel.find().populate("user").populate("admissionSemister").populate({
    path: "academicDepartment",
    populate: {
      path: 'academicFaculty'
    }
  }); // using built in static method of mongoose
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // console.log(id);
  const result = await StudentModel.findOne({ id: id }).populate("user").populate("admissionSemister").populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty"
    }
  });  // using built in static method of mongoose
  // console.log(result);

  // const result = await StudentModel.aggregate([
  //   { $match: {_id:id}}
  // ]);
  return result;
};

const updateSingleStudentIntoDB = async (id: string, updateData: Partial<Student>) => {
  
  const result = await StudentModel.findOneAndUpdate(
    { id: id },
    {updateData},
    {new: true}
  )
  // using built in static method of mongoose
  // console.log(result);

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExists = await UserModel.findOne({id});
    console.log(!isUserExists)
    if(!isUserExists){
      throw new Error("This user does not exits.")
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )

    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete user opertion.")
    }

    const deleteStudent = await StudentModel.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )

    if(!deleteStudent){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student operation")
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});  // using built in static method of mongoose
  console.log(result);
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentIntoDB
};
