import { TacademicSemister } from "../academicSemister/academicSemister.interface";
import { UserModel } from "./user.model";


 const findLastStudentId = async () => {
    const lastStudent = await UserModel.findOne(
      {role: 'student'},
      {
        id:1,
        _id: 0                           
      } 
    )
    .sort(
      {createdAt: -1}
    )
    .lean()
    
    //203001 0001
    return lastStudent?.id ? lastStudent.id : undefined;
 }


 //year semistercode 4digits number
 export const generateStudentId = async (payload: TacademicSemister) => {
  
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  // 2030 02 0002
  const lastStudentYear = lastStudentId?.substring(0,4); //2030
  const lastStudentSemisterCode = lastStudentId?.substring(4,6); //02
  const currentSemisterCode = payload.code;
  const currentSemisterYear = payload.year;

  if(lastStudentId && lastStudentYear === currentSemisterYear && lastStudentSemisterCode === currentSemisterCode){
    currentId = lastStudentId.substring(6)
  }

   let incrementId = (Number(currentId)+1).toString().padStart(4, '0');
   
   incrementId = `${payload.year}${payload.code}${incrementId}`;
   console.log({incrementId})
   return incrementId;
 }