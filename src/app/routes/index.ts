/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { jobRoutes } from '../modules/jobs/job.route';
import { applicationRoutes } from '../modules/applications/application.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/jobs',
    route: jobRoutes
  },
  {
    path: '/applications',
    route: applicationRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
