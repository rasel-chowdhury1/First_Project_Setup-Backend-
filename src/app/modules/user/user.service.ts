import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TnewUser, Tuser } from "./user.interface";
import { UserModel } from "./user.model";

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
    
    //set manually generated id
    userData.id = '203010001'

    console.log({userData})

    //create a user and function return a result
    const newUser = await UserModel.create(userData); // using built in static method of mongoose
    
    //create a student
    if(Object.keys(newUser).length){
        // set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await StudentModel.create(studentData)
        return newStudent;
    }

  };

  
  export const userServices = {
    createStudentIntoDB,
  }