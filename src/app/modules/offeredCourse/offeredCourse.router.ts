
import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../user/user.constrant";

const router = express.Router();


router.get("/", OfferedCourseControllers.getAllOfferedCourse);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);

router.post("/create-offered-course", 
    auth(USER_ROLE.admin),
    validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse
)

router.patch("/:id",
    // validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse
)

export const OfferedCourseRouter = router;