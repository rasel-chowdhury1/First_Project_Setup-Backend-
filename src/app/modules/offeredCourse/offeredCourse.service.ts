import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { OfferedCourseModel } from "./offeredCourse.model";
import { TOfferedCourse } from "./offeredCouse.interface";
import { SemisterRegistrationModel } from './../semisterRegistration/semiaterRegistration.model';
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utilts";


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    
    const {semisterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime } = payload;
    
    const isSemisterRegistrationExists = await SemisterRegistrationModel.findById(semisterRegistration);

    if(!isSemisterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "Semister Registration id not exists...!"
        )
    }

    const academicSemister = isSemisterRegistrationExists.academicSemister;

    const isAcademiicFaculty = await AcademicFacultyModel.findById(academicFaculty);

    if(!isAcademiicFaculty) {
        throw new AppError(httpStatus.NOT_FOUND,
            "Academic Faculty is not exists"
        )
    }

    const isAcademicDepartment = await AcademicDepartmentModel.findById(academicDepartment);

    if(!isAcademicDepartment){
        throw new AppError( httpStatus.NOT_FOUND,
            "Academic Department is not exists."
        )
    }

    const isCourse = await Course.findById(course);

    if(!isCourse){
        throw new AppError(httpStatus.NOT_FOUND, 
            "Course is not exists"
        )
    }

    const isFaculty = await Faculty.findById(faculty);

    if(!isFaculty){
        throw new AppError(httpStatus.NOT_FOUND, 
            "Faculty is not exists"
        )
    }

    //check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty
    })
    
    if(!isDepartmentBelongToFaculty){
        throw new AppError(httpStatus.NOT_FOUND, 
            `This ${academicDepartment} department is not belong to this ${academicFaculty} faculty`
        )
    }

    //check if the same offered course same section in same registered semester exists.
    const isSameOfferedCourseExistsWithSameRegisteredSemisterWithSameSection = await OfferedCourseModel.findOne({
        semisterRegistration,
        course,
        section
    })

    if(isSameOfferedCourseExistsWithSameRegisteredSemisterWithSameSection){
        throw new AppError(httpStatus.NOT_FOUND, 
            `Offered course with same section already exist!!!`
        )
    }

    //get the schedules of the faculties
    const assignedSchedules = await OfferedCourseModel.find({
        semisterRegistration,
        faculty,
        days: {$in: days}
    }).select("days startTime endTime")

    console.log(assignedSchedules)

    const newSchedule = {
        days,
        startTime,
        endTime
    };

    if(hasTimeConflict(assignedSchedules, newSchedule)){
        throw new AppError(httpStatus.CONFLICT,
            "This faculty is not available at that time ! choose other time or day"
        )
    }


    const result = await OfferedCourseModel.create({
        ...payload, academicSemister
    });
    return result;
}

const getAllOfferedCourseFromDB = async (query: Record<string,unknown>) => {
    
    const offeredCourseQuery = new QueryBuilder(
        OfferedCourseModel.find(),
        query
    )


    const result = await offeredCourseQuery.modelQuery;
    // const meta = await offeredCourseQuery.countTotal()
    return result;
}

const getSingleOfferedCourseFromDB = async(id: string) => {
    const result = await OfferedCourseModel.findById(id);
    return result
}

const updateOfferedCourseIntoDB = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {
    
    const {faculty, days, startTime, endTime} = payload;

    const isOfferedCourseExists = await OfferedCourseModel.findById(id);

    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "Offered course not found...!")
    }

    const isFacultyExists = await OfferedCourseModel.findById(faculty);

    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, 
            "facult not found in offered course!"
        )
    }


    const semisterRegistration = isOfferedCourseExists.semisterRegistration;

    const semisterRegistrationStatus = await SemisterRegistrationModel.findById(semisterRegistration);

    if(semisterRegistrationStatus?.status !== "UPCOMING"){
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not update this offered course as it is ${semisterRegistrationStatus?.status}`
        )
    }

    //get the schedules of the faculties
    const assignedSchedules = await OfferedCourseModel.find({
        semisterRegistration,
        faculty,
        days: {$in: days}
    }).select("days startTime endTime")

    console.log(assignedSchedules)

    const newSchedule = {
        days,
        startTime,
        endTime
    };

    if(hasTimeConflict(assignedSchedules, newSchedule)){
        throw new AppError(httpStatus.CONFLICT,
            "This faculty is not available at that time ! choose other time or day"
        )
    }



    const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {new: true});

    return result;
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}