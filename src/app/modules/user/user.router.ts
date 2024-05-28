import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middelwares/validRequest";

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.CreateStudentValidationSchema), userController.createStudent)


export const UserRouter = router;