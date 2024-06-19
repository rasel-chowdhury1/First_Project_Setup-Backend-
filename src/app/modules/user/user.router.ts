import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middelwares/validRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "./user.constrant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  '/create-student', 
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(studentValidations.CreateStudentValidationSchema), 
  userController.createStudent
)

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

  router.put(
    '/change-status/:id',
    auth('admin'),
    validateRequest(UserValidation.changeStatusValidationSchema),
    userController.changeStatus
  )

  router.get(
    "/me",
    auth("student", "faculty", "admin"),
    userController.getMe
  )

export const UserRouter = router;