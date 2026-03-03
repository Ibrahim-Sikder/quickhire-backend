import express from 'express';
import { Protected } from '../../middlewares/auth';
import { reportControllers } from './report.controller';
import { ReportValidations } from './report.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  Protected('admin', 'super_admin'),
  validateRequest(ReportValidations.createReportValidation),
  reportControllers.createReport,
);
router.get('/', reportControllers.getAllReport);
router.get('/:id', reportControllers.getSingleReport);
router.delete(
  '/:id',
  Protected('admin', 'super_admin'),
  reportControllers.deleteReport,
);
router.patch(
  '/:id',
  Protected('admin', 'super_admin'),
  validateRequest(ReportValidations.updateReportValidation),
  reportControllers.updateReport,
);

export const reportRoutes = router;
