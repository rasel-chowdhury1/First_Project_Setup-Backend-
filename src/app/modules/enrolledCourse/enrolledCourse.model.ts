import { Schema, model } from "mongoose";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interface";
import { Grade } from "./enrolledCourse.constrant";


const courseMarksSchema = new Schema<TCourseMarks>(
    {
        classTest1: {
            type: Number,
            default: 0 
        },
        midTerm: {
            type: Number,
            default: 0
        },
        classTest2: {
            type: Number,
            default: 0
        },
        finelTerm: {
            type: Number,
            default: 0
        }
    }
)

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
    {
        semisterRegistration: {
            type: Schema.Types.ObjectId,
            ref: 'SemisterRegistration',
            required: true
        },
        academicSemister: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemister',
            required: true
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true
        },
        offeredCourse: {
            type: Schema.Types.ObjectId,
            ref: 'OfferedCourse',
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
            required: true
        },
        isEnrolled: {
            type: Boolean,
            default: false
        },
        courseMarks: {
            type: courseMarksSchema,
            default: {}
        },
        grade: {
            type: String,
            enum: Grade,
            default: 'NA'
        },
        gradePoints: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }
)

export const EnrolledCourseModel = model<TEnrolledCourse>("EnrolledCourse", enrolledCourseSchema)