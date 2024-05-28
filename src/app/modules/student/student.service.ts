import { Student } from './student.interface';
import { StudentModel } from './student.model';

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

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find(); // using built in static method of mongoose
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  console.log(id);
  // const result = await StudentModel.findOne({ id });  // using built in static method of mongoose
  // console.log(result);

  const result = await StudentModel.aggregate([
    { $match: {id:id}}
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  console.log(id);
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});  // using built in static method of mongoose
  console.log(result);
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
