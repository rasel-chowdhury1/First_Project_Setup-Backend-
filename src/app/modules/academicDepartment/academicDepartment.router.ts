
import express from 'express';
import validateRequest from '../../middelwares/validRequest';
import { AcademicDepartmentValidaion } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.get('/', academicDepartmentController.getAllAcademicDepartment);

router.get('/:departmentId', academicDepartmentController.getSingleAcademicDepartment);

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidaion.createAcademicDepartmentValidation),
academicDepartmentController.createAcademicDepartment
)

router.patch('/:departmentId', 
    validateRequest(AcademicDepartmentValidaion.updateAcademicDepartmentValidation),
    academicDepartmentController.updateAcademicDepartment
)

export const AcademicDepartmentRouter = router;