import express from "express";
import { UserRouter } from "../modules/user/user.router";
import { StudentRouter } from "../modules/student/student.router";
import { AcademicSemisterRouter } from "../modules/academicSemister/academicSemister.router";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.router";
import { FacultyRoutes } from "../modules/faculty/faculty.router";
import { AdminRoutes } from "../modules/admin/admin.router";
import { CourseRoutes } from "../modules/course/course.router";
import { SemisterRegistrationRouter } from "../modules/semisterRegistration/semisterRegistrantion.router";

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
        path: '/faculties',
        router: FacultyRoutes
    },
    {
        path: '/admins',
        router: AdminRoutes
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
    },
    {
        path: '/courses',
        router: CourseRoutes
    },
]

// customRoute.forEach(route => router.use(route.path, route.router))

router.use('/users', UserRouter);
router.use('/students', StudentRouter);
router.use('/faculties', FacultyRoutes);
router.use('/admins', AdminRoutes);
router.use('/academicSemister', AcademicSemisterRouter);
router.use('/academicFaculty', AcademicFacultyRouter);
router.use('/academicDepartment', AcademicDepartmentRouter);
router.use('/courses', CourseRoutes);
router.use('/semister-registration', SemisterRegistrationRouter);


export default router;