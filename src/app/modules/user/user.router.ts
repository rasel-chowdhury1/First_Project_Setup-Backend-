import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middelwares/validRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.CreateStudentValidationSchema), userController.createStudent)

router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty,
  );
  
  router.post(
    '/create-admin',
    validateRequest(adminValidations.createAdminValidationSchema),
    userController.createAdmin,
  );

export const UserRouter = router;