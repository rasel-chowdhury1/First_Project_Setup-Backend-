
import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = express.Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)

router.post(
    '/create-academic-faculty', 
    // validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty
)

router.patch(
    '/:facultyId',
    validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema),
    AcademicFacultyController.updateAcademicFaculty
)

export const AcademicFacultyRouter = router;