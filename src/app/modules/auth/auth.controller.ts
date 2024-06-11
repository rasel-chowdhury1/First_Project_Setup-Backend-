import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";


const loginUser = catchAsync( async (req: Request, res: Response) => {
    console.log('LOGIN -> ', req.body)
    const result = await AuthServices.loginUser(req.body)
    const {refreshToken} = result;  

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is logged successfully...",
        data: result
    })
})

const changePassword = catchAsync( async (req: Request, res: Response) => {


    console.log('user controller -> ',req.user, req.body);

    const user = req?.user;
    const {...passwordData} = req.body;

    const result = await AuthServices.changePassword(req.user, passwordData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password updated successfully...",
        data: result
    })
})

export const AuthControllers = {
    loginUser,
    changePassword
}