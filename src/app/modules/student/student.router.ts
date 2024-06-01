import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middelwares/validRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', validateRequest(studentValidations.UpdateStudentValidationSchema), StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRouter = router;
