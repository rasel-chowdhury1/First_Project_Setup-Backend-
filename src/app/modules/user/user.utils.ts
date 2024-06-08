import { TacademicSemister } from "../academicSemister/academicSemister.interface";
import { Faculty } from "../faculty/faculty.model";
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
 export const generateStudentId = async (payload: Partial<TacademicSemister>) => {
  
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
   
   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
   
   console.log({incrementId});

   incrementId = `${payload.year}${payload.code}${incrementId}`;
   console.log('this data from user.utils file -> ',{incrementId})
   return incrementId;
 }

 const findLastFacultyId = async () => {
  const lastFaculty = await Faculty.findOne(
    {role: 'faculty'},
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
  return lastFaculty?.id ? lastFaculty.id : undefined;
}


export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};