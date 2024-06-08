
import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = express.Router();

router.post("/create-offered-course", 
    validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse
)

