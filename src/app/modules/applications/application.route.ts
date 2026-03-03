import express from 'express';
import { applicationControllers } from './application.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createApplicationSchema } from './application.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(createApplicationSchema),
    applicationControllers.applyForJob
);

router.get(
    '/',
    applicationControllers.getAllApplications
);
router.get(
    '/job/:jobId',
    applicationControllers.getApplicationsByJob
);

router.delete(
    '/:id',
    applicationControllers.deleteApplication
);

export const applicationRoutes = router;