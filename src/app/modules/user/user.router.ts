import express from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middelwares/validRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "./user.constrant";

const router = express.Router();

router.post(
  '/create-student', 
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.CreateStudentValidationSchema), 
  userController.createStudent)

router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty,
  );
  
  router.post(
    '/create-admin',
    validateRequest(adminValidations.createAdminValidationSchema),
    userController.createAdmin,
  );

export const UserRouter = router;