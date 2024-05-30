import {Schema, model } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";

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

academicDepartmentSchema.pre('save', async function(next) {

    const isDepartmentExist = await AcademicDepartmentModel.findOne({name: this.name});
    console.log({isDepartmentExist})

    if(isDepartmentExist){
        throw new Error("this name is already use.please change this name")
    }

    next()
})

export const AcademicDepartmentModel = model<TacademicDepartment>('AcademicDepartment', academicDepartmentSchema);