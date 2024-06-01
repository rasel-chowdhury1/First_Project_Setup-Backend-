import { TacademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {

    const result = await AcademicDepartmentModel.create(payload);
    return result
}

const getAllAcademicDepartmentFromDB = async() => {
    const result = await AcademicDepartmentModel.find().populate("academicFaculty");
    return result
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartmentModel.findById(id).populate("academicFaculty");
    return result
}

const updateAcademicDepartmentIntoDB = async (id: string, updateData: TacademicDepartment) => {
    const filter = {_id: id};

    const result = await AcademicDepartmentModel.findOneAndUpdate(filter, updateData, {new: true})
    
    return result;
}


export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}