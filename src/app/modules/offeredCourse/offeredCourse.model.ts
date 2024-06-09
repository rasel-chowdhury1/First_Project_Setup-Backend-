import { Schema, model } from "mongoose";
import { Days, TOfferedCourse } from "./offeredCouse.interface";


const OfferedCourseSchema = new Schema<TOfferedCourse>({
    semisterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SemisterRegistration'
    },
    academicSemister: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicSemister"
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty"
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicDepartment"
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty"
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: [{
        type: String,
        enum: Days
    }],
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

export const OfferedCourseModel = model<TOfferedCourse>("OfferedCourse", OfferedCourseSchema)