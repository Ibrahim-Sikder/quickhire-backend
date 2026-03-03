/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { jobControllers } from './job.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createJobSchema } from './job.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(createJobSchema),
    jobControllers.createJob
);

router.get('/', jobControllers.getAllJobs);

router.get('/:id', jobControllers.getSingleJob);

router.patch(
    '/:id',
    validateRequest(createJobSchema),
    jobControllers.updateJob
);

router.delete(
    '/:id',
    jobControllers.deleteJob
);

export const jobRoutes = router;