import express from 'express';

import { AdminControllers } from './admin.controller';
import validateRequest from '../../middelwares/validRequest';
import { adminValidations } from './admin.validation';


const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;