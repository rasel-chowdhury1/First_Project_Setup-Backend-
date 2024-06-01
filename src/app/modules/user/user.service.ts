import mongoose from "mongoose";
import config from "../../config";
import { academicSemisterNameCodeMappper } from "../academicSemister/academicSemister.constant";
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TnewUser, Tuser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
    const admissionSemisterData = await AcademicSemisterModel.findById(studentData.admissionSemister)

    const session = await mongoose.startSession()

    try {

    session.startTransaction()
      //set generated id
    userData.id = await generateStudentId(admissionSemisterData);

    // console.log({userData})

    //create a user and function return a result (transaction-1)
    // const newUser = await UserModel.create(userData); // using built in static method of mongoose

    //when using transaction then pass data as array [] return array [] data otherwise pass object {} return object{}
    const newUser = await UserModel.create([userData], {session})
    
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }
    //create a student
        // set id, _id as user
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;

        // const newStudent = await StudentModel.create(studentData)
        //create a student using transaction-2
        const newStudent = await StudentModel.create([studentData], {session})

        if(!newStudent){
          throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student.")
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
      await session.abortTransaction();
      await session.endSession()
    }


  };

  
  export const userServices = {
    createStudentIntoDB,
  }