import { JwtPayload } from "jsonwebtoken"
import { TEnrolledCourse } from "./enrolledCourse.interface"
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { StudentModel } from "../student/student.model";
import { EnrolledCourseModel } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { SemisterRegistrationModel } from './../semisterRegistration/semiaterRegistration.model';
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { CalculateGradeAndPoint } from "./enrolledCourse.utils";


const createEnrolledCourseIntoDB = async (
    userId: string,
    payload: TEnrolledCourse
 ) => {
    /**
     * Step1: Check if the offered course is exists
     * Step2: Check if the student already enrolled
     * Step3: Check credits exceeded from maxCredits of semisterRegistration
     * Step4: Create an enrolled course
     */

    const {offeredCourse} = payload;

    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);

    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, "Offered course is not found !!!")
    }

    if(isOfferedCourseExists.maxCapacity <= 0){
        throw new AppError(httpStatus.BAD_GATEWAY, "Not available seat in this offered course")
    }

    const student = await StudentModel.findOne({id: userId}, {_id: 1});

    const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
        semisterRegistration: isOfferedCourseExists?.semisterRegistration,
        offeredCourse: offeredCourse,
        student: student?._id
    })

    if(isStudentAlreadyEnrolled){
        throw new AppError(httpStatus.CONFLICT, "Student is already enrolled!!!")
    }

    //check total credits exceeds max credits
    const semisterRegistration = await SemisterRegistrationModel.findById(isOfferedCourseExists.semisterRegistration).select('maxCredit');

    //calculate total Credits for specific student id
    const enrolledCourses = await EnrolledCourseModel.aggregate([
    {
        $match: {
            semisterRegistration: isOfferedCourseExists.semisterRegistration,
            student: student?._id
        }
    },
    {
        $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "EnrolledCourseData"
        }
    },
    {
        $unwind: "$EnrolledCourseData"
    },
    {
        $group: {
            _id: null,
            totalEnrolledCourseCredits: {
                $sum: "$EnrolledCourseData.credits"
            }
        }
    },
    {
        $project: {
            _id: 0,
            totalEnrolledCourseCredits: 1
        }
    }
])

    console.log({enrolledCourses})

    //total enrolled credits + new enrolled course credit > maxCredit
    const courseDetails = await Course.findById(isOfferedCourseExists.course);

    const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCourseCredits : 0;
    
    const maxCredit = semisterRegistration?.maxCredit;
    const currentCredit = totalCredits + courseDetails?.credits;

    if(totalCredits && maxCredit && currentCredit > maxCredit){
        throw new AppError(httpStatus.BAD_REQUEST, "You have exceeded maximum number of credits!!!")
    }
    else{
        console.log("Successfullly enrolled")
    }

//     const session = await mongoose.startSession();

//     try{
//         session.startTransaction()

//     const result = await EnrolledCourseModel.create([{
//         semisterRegistration: isOfferedCourseExists.semisterRegistration,
//         academicSemister: isOfferedCourseExists.academicSemister,
//         academicFaculty: isOfferedCourseExists.academicFaculty,
//         academicDepartment: isOfferedCourseExists.academicDepartment,
//         offeredCourse: offeredCourse,
//         course: isOfferedCourseExists.course,
//         student: student?._id,
//         faculty: isOfferedCourseExists.faculty,
//         isEnrolled: true
//     }], {session})

//     if(!result){
//         throw new AppError(httpStatus.BAD_REQUEST, "Failed to enroll in this course!!!");
//     }

//     const maxCapacity = isOfferedCourseExists.maxCapacity;

//     await OfferedCourseModel.findByIdAndUpdate(offeredCourse,
//      {
//         maxCapacity: maxCapacity - 1,
//     },
//     {
//         new: true
//     }
// )


//     await session.commitTransaction();
//     await session.endSession()

//     return result;

// } catch(err: any){
//   await session.abortTransaction();
//   await session.endSession();
//   throw new AppError(httpStatus.BAD_REQUEST, err)
// }
    

}

const updateEnrolledCourseMarksIntoDB = async(facultyId:string, payload: Partial<TEnrolledCourse>) => {
    
    console.log({facultyId, payload})
    const {semisterRegistration, offeredCourse, student, courseMarks} = payload

    const isSemisterRegistration = await SemisterRegistrationModel.findById(semisterRegistration);

    // console.log({isSemisterRegistration})

    if(!isSemisterRegistration){
        throw new AppError(httpStatus.NOT_FOUND, "Semister registration not found !")
    }

    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);
    
    // console.log({isOfferedCourseExists})

    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, "Offered course not found!!!")
    }

    const isStudentExists = await StudentModel.findById(student);

    // console.log({isStudentExists})

    if(!isStudentExists){
        throw new AppError(httpStatus.NOT_FOUND, "Student not found!!!")
    }

    const facultyDetails = await Faculty.findOne({id:facultyId},{_id: 1})

    if(!facultyDetails){
        throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !")
    }

    const isCourseBelongToFaculty = await EnrolledCourseModel.findOne({
        semisterRegistration,
        offeredCourse,
        student,
        faculty: facultyDetails?._id
    })

    if(!isCourseBelongToFaculty){
        throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!")
    }

    const modifiedData: Record<string,unknown> = {
        ...courseMarks
    }

    console.log({modifiedData})

    if(courseMarks?.finelTerm){
    const {classTest1, classTest2, midTerm } = isCourseBelongToFaculty.courseMarks;

    const totalMarks = Math.ceil(classTest1*0.10 + midTerm * 0.30 + classTest2 * 0.10 + courseMarks.finelTerm * 0.50);
    
    console.log({totalMarks})

    const gradeAndPointCount = CalculateGradeAndPoint(totalMarks);

    modifiedData.grade = gradeAndPointCount.grade;
    modifiedData.gradePoints = gradeAndPointCount.gradPoints;
    modifiedData.isCompleted = true
}

    if(courseMarks && Object.keys(courseMarks).length){
        console.log(Object.keys(courseMarks));
        console.log(Object.entries(courseMarks))
        for( const [key,value] of Object.entries(courseMarks)){
            modifiedData[`courseMarks.${key}`] = value;
        }
    }

    console.log("modified Data 2 -> ", {modifiedData})

    const result = await EnrolledCourseModel.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, {new:true});
    
    console.log({result})
    return result

}

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB
}