import  express  from "express";
import validateRequest from "../../middelwares/validRequest";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../user/user.constrant";

const router = express.Router();

router.post(
    '/create-enrolled-course',
    auth(USER_ROLE.student),
    validateRequest(
        EnrolledCourseValidation.createEnrolledCourseValidationSchema
    ),
    EnrolledCourseController.createEnrolledCourse
)

router.patch(
    '/update-enrolled-course-marks',
    auth('faculty'),
    validateRequest(EnrolledCourseValidation.updatedEnrolledCourseValidationSchema),
    EnrolledCourseController.updateEnrolledCourseMark
)

export const EnrolledCourseRouter = router;