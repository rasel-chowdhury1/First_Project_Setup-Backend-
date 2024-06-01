
import { Model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  admissionSemister: Types.ObjectId;
  isDeleted: boolean
};

// for creating static
export interface TStudentModel extends Model<Student>{
  isUserExists(id: string) : Promise<Student | null>;
}

// for creating instance

// export type StudentMethods = {
//   isUserExists(id: string) : Promise<Student | null>;
// }

// export type TStudentModel = Model<Student, {}, StudentMethods>