import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
//will call controller function
router.post('/create-student', StudentController.createStudent);

export const StudentRouter = router;
