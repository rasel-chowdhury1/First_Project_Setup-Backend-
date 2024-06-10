import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
    console.log({payload})
    //checking if the user is exists
    const isUserExists = await UserModel.findOne({id: payload?.id})

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

    //Access Granted: Send AccessToken, RefreshToken

    
}

export const AuthServices = {
    loginUser
}