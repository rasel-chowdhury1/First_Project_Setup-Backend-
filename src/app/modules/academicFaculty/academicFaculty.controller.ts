import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const academicFacultyData = req.body;

    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(academicFacultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty created successfully",
        data: result
    })
})

const getAllAcademicFaculties = catchAsync( async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully fetched Academic Semister',
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync( async (req, res) => {
    const {facultyId} = req.params;

    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully fetched Academic Faculty',
        data: result
    })
})

const updateAcademicFaculty = catchAsync( async (req, res) => {
    const {facultyId} = req.params;
    const updateData = req.body;

    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(facultyId, updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfuly updated academic faculty',
        data: result
    })
})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}