import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { SemisterRegistrationServices } from "./semisterRegistratin.service";

const createSemisterRegistration = catchAsync( 
    async (req: Request, res: Response) => {

    const result = await SemisterRegistrationServices.createSemisterRegistrationIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semister Registration create successfully.",
        data: result
    })
})

const getAllSemisterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemisterRegistrationServices.getAllSemisterRegistrationFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully retrived all semister Registration",
        data: result
    })
})

const getSingleSemisterRegistration = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemisterRegistrationServices.getSingleSemisterRegistraionFromDB(id)
 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully retrived semister registration",
        data: result
    })
})

const updateSingleSemisterRegistration = catchAsync( async (req, res) => {
   const {id} = req.params;
   const updatData =  req.body;

   const result = await SemisterRegistrationServices.updateSemisterRegistrationIntoDB(id, req.body)

sendResponse( res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registration is update successfully.",
    data: result
})
})


const deleteSemisterRegistration = catchAsync( async (req, res) => {
    const {id} = req.params;
    
    // const result = await SemisterRegistrationServices.
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message : "Semister Registration is deleted successfully",
        data: ''
    })
})

export const SemisterRegistrationController = {
    createSemisterRegistration,
    getAllSemisterRegistration,
    getSingleSemisterRegistration,
    updateSingleSemisterRegistration,
    // deleteSemisterRegistration
}