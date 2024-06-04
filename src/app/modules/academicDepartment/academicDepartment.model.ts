import {Schema, model } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TacademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
},
{
   timestamps: true
})


// academicDepartmentSchema.pre('save', async function(next) {

//     const isDepartmentExist = await AcademicDepartmentModel.findOne({name: this.name});
//     console.log({isDepartmentExist})

//     if(isDepartmentExist){
//         throw new AppError( 404, "this name is already use.please change this name")
//     }

//     next()
// })

academicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
   const query = this.getQuery();
   const data = this.getUpdate()
   console.log({query, data})
  
   const isDepartmentExist = await AcademicDepartmentModel.findOne(query);


   if(!isDepartmentExist){
    throw new AppError(404,"This department does not exist!");
   }

   next()
})

export const AcademicDepartmentModel = model<TacademicDepartment>('AcademicDepartment', academicDepartmentSchema);