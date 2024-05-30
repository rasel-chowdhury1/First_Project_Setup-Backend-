import express from "express";
import { UserRouter } from "../modules/user/user.router";
import { StudentRouter } from "../modules/student/student.router";
import { AcademicSemisterRouter } from "../modules/academicSemister/academicSemister.router";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.router";

const router = express.Router()

const customRoute = [
    {
        path: '/users',
        router: UserRouter
    },
    {
        path: '/students',
        router: StudentRouter
    },
    {
        path: '/academicSemister',
        router: AcademicSemisterRouter
    },
    {
        path: '/academicFaculty',
        router: AcademicFacultyRouter
    },
    {
        path: '/academicDepartment',
        router: AcademicDepartmentRouter
    }
]

// customRoute.forEach(route => router.use(route.path, route.router))

router.use('/users', UserRouter);
router.use('/students', StudentRouter);
router.use('/academicSemister', AcademicSemisterRouter);
router.use('/academicFaculty', AcademicFacultyRouter);
router.use('/academicDepartment', AcademicDepartmentRouter);


export default router;