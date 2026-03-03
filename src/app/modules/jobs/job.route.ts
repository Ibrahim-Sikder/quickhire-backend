import express from 'express';
import { jobControllers } from './job.controller';
import { Protected } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { createJobSchema } from './job.validation';

const router = express.Router();

router.post(
    '/',
    Protected('admin', 'super_admin'),
    validateRequest(createJobSchema),
    jobControllers.createJob
);

router.get('/', jobControllers.getAllJobs);

router.get('/:id', jobControllers.getSingleJob);

router.patch(
    '/:id',
    Protected('admin', 'super_admin'),
    validateRequest(createJobSchema),
    jobControllers.updateJob
);

router.delete(
    '/:id',
    Protected('admin', 'super_admin'),
    jobControllers.deleteJob
);

export const jobRoutes = router;