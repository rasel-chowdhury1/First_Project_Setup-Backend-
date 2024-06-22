import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync( async (req, res) => {
    const {userId} = req.user;
    console.log({userId});
    console.log(req.body)

    const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(userId, req.body);

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is enrolled successfully",
        data: result
    })
})

const updateEnrolledCourseMark = catchAsync (async (req, res) => {
    console.log(req.user);
    const facultyId = req.user.userId;
    const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
        facultyId,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Mark is updated successfully",
        data: result
    })
})


export const EnrolledCourseController = {
    createEnrolledCourse,
    updateEnrolledCourseMark
}