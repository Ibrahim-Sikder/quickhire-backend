import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { imageGalleryService } from './gallery.service';

const getAllImages: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.getAllImages(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Images retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

const getImagesByFolder: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.getImagesByFolder(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Images retrieved successfully',
    data: result,
  });
});

const createImage: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.createImage(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Image uploaded successfully',
    data: result,
  });
});

const deleteImage: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.deleteImage(req.body);
  console.log('id console here ',req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Image deleted successfully',
    data: result,
  });
});

// Function to create a folder
const createFolder: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.createFolder(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Folder created successfully',
    data: result,
  });
});

// Function to get all folders
const getFolders: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.getFolders(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Folders retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

// Function to delete a folder
const deleteFolder: RequestHandler = catchAsync(async (req, res) => {
  const result = await imageGalleryService.deleteFolder(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Folder deleted successfully',
    data: result,
  });
});

export const imageGalleryController = {
  getAllImages,
  getImagesByFolder,
  createImage,
  deleteImage,
  createFolder,
  deleteFolder,
  getFolders,
};
