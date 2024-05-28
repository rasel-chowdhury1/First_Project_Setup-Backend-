import express from 'express';
import { AcademicSemisterController } from './academicSemister.controller';
import validateRequest from '../../middelwares/validRequest';
import { academicValidationSchema } from './academicSemister.validation';

const router = express.Router();

router.get('/', AcademicSemisterController.getAllAcademicSemister);
router.get('/:semisterId', AcademicSemisterController.getSingleAcademicSemister);

router.post('/create-academic-semister', validateRequest(academicValidationSchema.createAcademicValidationSchema), AcademicSemisterController.createAcademicSemister);

router.patch('/:semisterId', validateRequest(academicValidationSchema.updateAcademicValidationSchema),AcademicSemisterController.updatedSingleAcademicSemister)


export const AcademicSemisterRouter = router;