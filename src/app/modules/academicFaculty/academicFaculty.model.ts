import { Schema, model } from "mongoose";
import { TacademicFaculty } from "./academicFaculty.interface";
import { academicValidationSchema } from "../academicSemister/academicSemister.validation";


const academicFacultySchema = new Schema<TacademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
})

export const AcademicFacultyModel = model<TacademicFaculty>('AcademicFaculty',academicFacultySchema)