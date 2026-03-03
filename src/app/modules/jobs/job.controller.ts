import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { jobServices } from './job.service';

const createJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await jobServices.createJob(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Job created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await jobServices.getAllJobs(req.query);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Jobs retrieved successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getSingleJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await jobServices.getSingleJob(req.params.id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Job retrieved successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const updateJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await jobServices.updateJob(req.params.id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Job updated successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await jobServices.deleteJob(req.params.id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Job deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const jobControllers = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
};