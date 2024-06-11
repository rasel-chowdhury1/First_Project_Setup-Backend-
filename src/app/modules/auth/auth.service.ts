import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TChangePassword, TDecode, TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";


const loginUser = async (payload: TLoginUser) => {
    console.log({payload})
    //checking if the user is exists
    const isUserExists = await UserModel.findOne({id: payload?.id}).select("+password")
    
    console.log({isUserExists})
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "This user is not found!"
        )
    }

    //checking if the user is deleted
    const isDeleted = isUserExists?.isDeleted;

    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 
            "This user is deleted"
        )
    }

    //checking if the user status is blocked
    const userStatus = isUserExists?.status;

    if(userStatus === "blocked"){
        throw new AppError(httpStatus.FORBIDDEN, 
            "This user is blocked..."
        )
    }

    //checking if the password is correct
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExists.password);

    console.log({isPasswordMatch})

    //Access Granted: Send AccessToken, RefreshToke
     
    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role
    }
    //create token and send to the client
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {expiresIn: '1d'}
    )

    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_secret as string,
        {expiresIn: '10d'}
    )
   
    return {
        accessToken, 
        refreshToken,
        needsPasswordChange: isUserExists?.needsPasswordChange
    }
    
}


const changePassword = async (user: JwtPayload, payload: TChangePassword) => {
    
    console.log({user, payload})
    //checking if the user is exists
    const isUserExists = await UserModel.findOne({id:user.userId}).select("+password")

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "This user is not found!"
        )
    }

    //checking if the user is deleted
    const isDeleted = isUserExists?.isDeleted;

    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 
            "This user is deleted"
        )
    }

    //checking if the user status is blocked
    const userStatus = isUserExists?.status;

    if(userStatus === "blocked"){
        throw new AppError(httpStatus.FORBIDDEN, 
            "This user is blocked..."
        )
    }

    //checking if the password is correct
    const isPasswordMatch = await bcrypt.compare(payload?.oldPassword, isUserExists.password);
    

    if(!isPasswordMatch){
        throw new AppError(httpStatus.FORBIDDEN,
            "Password do not matched...!!!"
        )
    }
    // console.log({isPasswordMatch})

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_sold_rounds)
    )

    const result = await UserModel.findOneAndUpdate({
        id: user.userId,
        role: user.role
    },{
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date
    }, {new:true})

    return result
}

export const AuthServices = {
    loginUser,
    changePassword
}