import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OfferedCourseServices } from "./offeredCourse.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createOfferedCourse = catchAsync(
    async (req: Request, res: Response) => {
        const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Offered Course is created successfuly",
            data: result
        })
    }
)


export const OfferedCourseControllers = {
    createOfferedCourse,
}