import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { AcademicSemisterModel } from "../academicSemister/academicSemister.model"
import { TSemisterRegistration } from "./semisterRegistration.interface"
import { SemisterRegistrationModel } from "./semiaterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { RegistrationStatus } from "./semisterRegistration.constrant"



const createSemisterRegistrationIntoDB = async (payload: TSemisterRegistration) => {
    
    const academicSemisterId = payload?.academicSemister

    //check if there any registered semister that is already "UPCOMING" | "ONGOING"
    const isThereAnyUpcomingOrOngoingSemister = await SemisterRegistrationModel.findOne({
        $or: [
            {status: "UPCOMING"},
            {status: "ONGOING"},
        ]
    })

    if(isThereAnyUpcomingOrOngoingSemister){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingOrOngoingSemister.status} registed semister !`
        )
    }
    
    //check if the semister is exist
    const isAcademicSemisterExists = await AcademicSemisterModel.findById(academicSemisterId)
     
    if(!isAcademicSemisterExists){
        throw new AppError( httpStatus.NOT_FOUND, "This academic semister not found")
    }

    

    //check if the semister is already registered 
    const isSemisterRegistrationExists = await SemisterRegistrationModel.findOne({academicSemister: academicSemisterId})

    if(isSemisterRegistrationExists){
        throw new AppError(
            httpStatus.CONFLICT,
            "this semister is already registered"
        )
    }


    const result = await SemisterRegistrationModel.create(payload);

    return result

}

const getAllSemisterRegistrationFromDB = async ( query: Record<string,unknown>) => {

    const semisterRegistrationQuery = new QueryBuilder(
        SemisterRegistrationModel.find().populate('academicSemister'), 
    query
   )
   .filter()
   .sort()
   .paginate()
   .fields()

    const result = await semisterRegistrationQuery.modelQuery;
    return result;
}

const getSingleSemisterRegistraionFromDB = async (Id: string) => {
   const result = await SemisterRegistrationModel.findById(Id);

   return result;
}

const updateSemisterRegistrationIntoDB = async (id: string, payload: Partial<TSemisterRegistration>) => {


    //check if the requeste registered semister is exists
    const isSemisterRegistrationExists = await SemisterRegistrationModel.findById(id);

    if(!isSemisterRegistrationExists){
        throw new AppError(
            httpStatus.NOT_FOUND,
            "This semister not found"
        )
    }

    // if the requested semester registration status is ended , we will not update anything

    const currentSemisterStatus = isSemisterRegistrationExists.status;
    

    if(currentSemisterStatus === RegistrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `This semister is already ${currentSemisterStatus}`)
    }
    
    const requestedStatus = payload?.status;

    //UPCOMING --> ONGOING --> ENDED
    if(currentSemisterStatus === 'UPCOMING' && requestedStatus === "ENDED"){

        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not directly change status from ${currentSemisterStatus} to ${requestedStatus} !`
        )
    }

    if(currentSemisterStatus === 'ONGOING' && requestedStatus === "UPCOMING"){

        throw new AppError(
            httpStatus.BAD_REQUEST,
            `You can not directly change status from ${currentSemisterStatus} to ${requestedStatus} !`
        )
    }

    const result = await SemisterRegistrationModel.findByIdAndUpdate(id, 
        payload,
        { 
            new: true,
            runValidators: true
        }
    )

    return result;
}

const deleteSemisterRegistrationIntoDB = async (id:string) => {

}


export const SemisterRegistrationServices = {
    createSemisterRegistrationIntoDB,
    getAllSemisterRegistrationFromDB,
    getSingleSemisterRegistraionFromDB,
    updateSemisterRegistrationIntoDB,
    deleteSemisterRegistrationIntoDB
}