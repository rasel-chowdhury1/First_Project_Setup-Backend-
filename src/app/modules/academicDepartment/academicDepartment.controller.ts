import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req, res) => {
    const departmentData = req.body;

    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(departmentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department created successfully.",
        data: result
    })

})

const getAllAcademicDepartment = catchAsync( async (req,res) => {

    const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department are fetched successfully.',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req,res) => {
    const {departmentId} = req.params;

    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department are fetched successfully.",
        data: result
    })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const {departmentId} = req.params;
    const updateData = req.body;

    const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(departmentId,updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department updated successfully",
        data: result
    })
})

export const academicDepartmentController = {
    createAcademicDepartment,
    getSingleAcademicDepartment,
    getAllAcademicDepartment,
    updateAcademicDepartment
}