import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemisterService } from "./academicSemister.service";


const createAcademicSemister = catchAsync( async (req,res) => {

    const newAcademicSemister = req.body;

    const result = await AcademicSemisterService.createAcademicSemisterIntoDB(newAcademicSemister);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semister is created successfully',
        data: result
    })
})

const getAllAcademicSemister = catchAsync( async (req, res) => {

    const result = await AcademicSemisterService.getAllAcademicSemisterFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully fetched Semister data.",
        data: result
    })
})

const getSingleAcademicSemister = catchAsync( async(req, res) => {
    const {semisterId} = req.params;
    // console.log({semisterId})
    const result = await AcademicSemisterService.getSingleAcademicSemisterFromDB(semisterId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully fetch this semister",
        data: result
    })
})

const updatedSingleAcademicSemister = catchAsync( async (req, res) => {
    const {semisterId} = req.params;
    const data = req.body;

    const result = await AcademicSemisterService.updateAcademicSemisterIntoDB(semisterId, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfull updated",
        data: result
    })
})

export const AcademicSemisterController = {
    createAcademicSemister,
    getAllAcademicSemister,
    getSingleAcademicSemister,
    updatedSingleAcademicSemister
}