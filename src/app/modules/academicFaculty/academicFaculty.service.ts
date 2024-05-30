import { TacademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model"


const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
    const result = await AcademicFacultyModel.create(payload);
    return result;
}

const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFacultyModel.find();
    return result;
}

const getSingleAcademicFacultyFromDB = async (academicId: string) => {
    const result = await AcademicFacultyModel.findById({_id: academicId});
    return result;
}

const updateAcademicFacultyIntoDB = async (academicId: string, updateData: Partial<TacademicFaculty>) => {
   const filter = {_id: academicId};

   const result = await AcademicFacultyModel.findOneAndUpdate(
    filter, updateData, {new: true}
   )

   return result;
}

export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}