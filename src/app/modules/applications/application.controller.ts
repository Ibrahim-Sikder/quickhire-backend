import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { applicationServices } from './application.service';

const applyForJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await applicationServices.applyForJob(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Application submitted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getAllApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await applicationServices.getAllApplications(req.query);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Applications retrieved successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getApplicationsByJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await applicationServices.getApplicationsByJob(
            req.params.jobId
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Applications for job retrieved successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const deleteApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await applicationServices.deleteApplication(
            req.params.id
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Application deleted successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const applicationControllers = {
    applyForJob,
    getAllApplications,
    getApplicationsByJob,
    deleteApplication,
};