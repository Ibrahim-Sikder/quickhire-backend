/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { jobRoutes } from '../modules/jobs/job.route';
import { applicationRoutes } from '../modules/applications/application.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
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
