import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TChangePassword, TDecode, TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";


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

    if(!isPasswordMatch){
        throw new AppError(httpStatus.FORBIDDEN, "Password does not match!!!")
    }

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


const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  
    const { userId, iat } = decoded;
  
    // checking if the user is exist
    const user = await UserModel.findOne({id: userId}).select("+password")
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
  
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };
  
    //create token and send to the client
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {expiresIn: '1d'}
    )
  
    return {
      accessToken,
    };
  };

const forgetPassword = async (id: string) => {
   //checking if the user is exist
   const user = await UserModel.findOne({id});

   if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  //create token and send to the client
  const resetToken = jwt.sign(
      jwtPayload,
      config.jwt_access_secret as string,
      {expiresIn: '10m'}
  )

  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`

  console.log("Reset ui link -> ", resetUILink)
  console.log(user.email)
  sendEmail(user.email, resetUILink);

  return resetUILink
}

const resetPassword = async(payload: Record<string,unknown>, token: string) => {
    const {id,newPassword} = payload;

    //checking if the user is exist
   const user = await UserModel.findOne({id});

   if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    
      const { userId } = decoded;

      if(id != userId){
        throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!!!")
      }
      
    //hash new password
    const newHashedPassword = await bcrypt.hash(
        newPassword as string,
        Number(config.bcrypt_sold_rounds)
    )

    const result = await UserModel.findOneAndUpdate({id:id},
     {password: newHashedPassword},
     {new: true}
    )

    return result
}
  
export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}