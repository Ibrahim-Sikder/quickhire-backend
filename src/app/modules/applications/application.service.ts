/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from './application.model';

import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IApplication } from './application.interface';
import { Job } from '../jobs/jobs.model';

const applyForJob = async (payload: IApplication) => {
    const job = await Job.findById(payload.job);
    if (!job) {
        throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
    }

    const result = await Application.create(payload);
    return result;
};

const getAllApplications = async (query: Record<string, unknown>) => {
    const applicationQuery = new QueryBuilder(
        Application.find().populate('job'),
        query
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const [meta, applications] = await Promise.all([
        applicationQuery.countTotal(),
        applicationQuery.modelQuery.lean(),
    ]);

    return { meta, applications };
};

const getApplicationsByJob = async (jobId: string) => {
    return Application.find({ job: jobId })
        .populate('job')
        .lean();
};

const deleteApplication = async (id: string) => {
    const result = await Application.deleteOne({ _id: id });
    return result;
};

export const applicationServices = {
    applyForJob,
    getAllApplications,
    getApplicationsByJob,
    deleteApplication,
};