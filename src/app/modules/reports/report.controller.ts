import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { reportServices } from './report.service';

const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportServices.createReport(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Report create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportServices.getAllReport(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Report are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await reportServices.getSingleReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Report is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await reportServices.deleteReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Report deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await reportServices.updateReport(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Report update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const reportControllers = {
  getAllReport,
  getSingleReport,
  deleteReport,
  updateReport,
  createReport,
};
