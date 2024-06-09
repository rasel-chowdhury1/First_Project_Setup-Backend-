import mongoose from "mongoose";
import config from "../../config";
// import { academicSemisterNameCodeMappper } from "../academicSemister/academicSemister.constant";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { Tuser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Admin } from "../admin/admin.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TFaculty } from "../faculty/faculty.interface";

const createStudentIntoDB = async (password: string, studentData: Student) => {

    // create a user object
    // const user: TnewUser = {}
    //Partial mean optional
    const userData: Partial<Tuser> = {}

    //if password not giver, use default password
    // if(!password){
    //     user.password = config.default_pass as string;
    // }else{
    //     user.password = password;
    // }
    //using shortand syntex above code
    userData.password = password || config.default_pass as string;

    //set student role
    userData.role = 'student';

    //find academic semester id info
    const admissionSemisterData = await AcademicSemisterModel.findById(studentData.admissionSemister) as object;
    console.log('admission Semister data type check -> ',typeof admissionSemisterData)
    const session = await mongoose.startSession()
    
    // console.log({userData})
    // userData.id = await generateStudentId(admissionSemisterData);
    // const newUser = await UserModel.create(userData);
    // studentData.id = newUser.id;
    // studentData.user = newUser._id;
    // const newStudent = await StudentModel.create(studentData);

    // console.log({newStudent})

    // return newStudent;

    try {

    session.startTransaction()
      //set generated id
    userData.id = await generateStudentId(admissionSemisterData);

    console.log({userData})

    //create a user and function return a result (transaction-1)
    // const newUser = await UserModel.create(userData); // using built in static method of mongoose

    //when using transaction then pass data as array [] return array [] data otherwise pass object {} return object{}
    const newUser = await UserModel.create([userData], {session})
    console.log({newUser})
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }
    //create a student
        // set id, _id as user
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;

        // const newStudent = await StudentModel.create(studentData)
        //create a student using transaction-2
        console.log({studentData})
        const newStudent = await StudentModel.create([studentData], {session})
        
        console.log({newStudent})
        if(!newStudent){
          throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student.")
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('Failed to create this student');
    }


  };

  const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<Tuser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);
  
    //set student role
    userData.role = 'faculty';
  
    // find academic department info
    const academicDepartment = await AcademicDepartmentModel.findById(
      payload.academicDepartment,
    );
  
    if (!academicDepartment) {
      throw new AppError(400, 'Academic department not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFacultyId();
  
      // create a user (transaction-1)
      const newUser = await UserModel.create([userData], { session }); // array
  
      //create a faculty
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };
  
  const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<Tuser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);
  
    //set student role
    userData.role = 'admin';
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await UserModel.create([userData], { session }); 
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

  
  export const userServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB
  }