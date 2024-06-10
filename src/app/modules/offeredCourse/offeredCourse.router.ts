
import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidation } from "./offeredCourse.validation";

const router = express.Router();


router.get("/", OfferedCourseControllers.getAllOfferedCourse);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);

router.post("/create-offered-course", 
    // validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse
)

router.patch("/:id",
    // validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse
)

export const OfferedCourseRouter = router;