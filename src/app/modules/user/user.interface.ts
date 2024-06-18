import { Model } from "mongoose";
import { USER_ROLE } from "./user.constrant";

export type Tuser = {
    id: string,
    email: string,
    password: string,
    needsPasswordChange: boolean,
    passwordChangedAt?: Date,//this filed track when change password in auth service for change-password route
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}

export type TnewUser = {
    password: string,
    role: string,
    id: string
}

//for creating statics
export interface TUserModel extends Model<Tuser>{
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp : Date,
    jwtIssuedTimeStamp: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE;