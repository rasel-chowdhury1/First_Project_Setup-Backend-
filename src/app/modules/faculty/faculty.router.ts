import express from 'express';

import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middelwares/validRequest';
import auth from '../../middelwares/auth';
import { USER_ROLE } from '../user/user.constrant';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;