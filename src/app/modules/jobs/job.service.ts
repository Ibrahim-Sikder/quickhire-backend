

import QueryBuilder from '../../builder/QueryBuilder';
import { IJob } from './job.interface';
import { Job } from './jobs.model';

const createJob = async (payload: IJob) => {
    const result = await Job.create(payload);
    return result;
};

const getAllJobs = async (query: Record<string, unknown>) => {
    const modifiedQuery = { ...query };

    if (query.sortBy) {
        const sortBy = query.sortBy as string;
        const sortOrder = (query.sortOrder as string) || 'desc';
        const direction = sortOrder === 'asc' ? '' : '-';

        modifiedQuery.sort = `${direction}${sortBy}`;
        delete modifiedQuery.sortBy;
        delete modifiedQuery.sortOrder;
    }

    const jobQuery = new QueryBuilder(Job.find(), modifiedQuery)
        .search(['title', 'company', 'location', 'category'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const [meta, jobs] = await Promise.all([
        jobQuery.countTotal(),
        jobQuery.modelQuery.lean(),
    ]);

    return { meta, jobs };
};

const getSingleJob = async (id: string) => {
    return Job.findById(id).lean();
};

const updateJob = async (id: string, payload: Partial<IJob>) => {
    const result = await Job.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const deleteJob = async (id: string) => {
    const result = await Job.deleteOne({ _id: id });
    return result;
};

export const jobServices = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
};