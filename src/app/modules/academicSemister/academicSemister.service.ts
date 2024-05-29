import { academicSemisterNameCodeMappper } from "./academicSemister.constant";
import { TacademicSemister } from "./academicSemister.interface";
import { AcademicSemisterModel } from "./academicSemister.model";



const createAcademicSemisterIntoDB = async (data: TacademicSemister) => {
    

   if(academicSemisterNameCodeMappper[data.name] !== data.code){
    throw new Error("Invalid semister code!!!")
   }

    const result = await AcademicSemisterModel.create(data);
    return result;
}

const getAllAcademicSemisterFromDB = async () => {
    const result = await AcademicSemisterModel.find()
    return result
}

const getSingleAcademicSemisterFromDB = async (semisterId: string) => {
    console.log({semisterId})
    const result = await AcademicSemisterModel.findOne({_id: semisterId});
    console.log({result})
    return result;
}

const updateAcademicSemisterIntoDB = async (semisterId: string, updateData: Partial<TacademicSemister>) => {
    const filter = {_id: semisterId};
    
    if(updateData.name && updateData.code && academicSemisterNameCodeMappper[updateData.name] !== updateData.code){
        throw new Error("Invalid Semister Code!")
    }
    const result = await AcademicSemisterModel.findOneAndUpdate(filter, updateData, {new:true});
    return result;
}

export const AcademicSemisterService = {
    createAcademicSemisterIntoDB,
    getAllAcademicSemisterFromDB,
    getSingleAcademicSemisterFromDB,
    updateAcademicSemisterIntoDB
}