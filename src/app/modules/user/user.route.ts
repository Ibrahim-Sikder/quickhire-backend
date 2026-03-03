import express from 'express';
import { UserController } from './user.controller';
import { userValidations } from './user.validation';
import { Protected } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
const router = express.Router();

router.get('/', UserController.getAllUser);
router.post(
  '/',
  // Protected('admin', 'super_admin'),
  validateRequest(userValidations.createUserValidation),
  UserController.createUser,
);
router.delete('/:id', Protected('admin', 'super_admin'), Protected('admin'), UserController.deleteUser);
export const userRoutes = router;
