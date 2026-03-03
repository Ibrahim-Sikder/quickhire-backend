/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import { Request } from 'express';
import {
  cloudinaryConfig,
  sendImageToCloudinary,
} from '../../../utils/sendImageToCloudinary';
import mongoose from 'mongoose';
import { UploadApiResponse } from 'cloudinary';
import { imageValidator } from './gallery.utils';
import { FolderModel, ImageGalleryModel } from './gallery.model';

/* ===============================
   IMAGE LIST
=================================*/
const getAllImages = async (req: Request) => {
  const query = req.query;

  const galleryQuery = new QueryBuilder(
    ImageGalleryModel.find().populate('folder'),
    query
  )
    .filter()
    .sort()
    .paginate();

  const [meta, result] = await Promise.all([
    galleryQuery.countTotal(),
    galleryQuery.modelQuery.lean(),
  ]);

  return { result, meta };
};

/* ===============================
   GET IMAGES BY FOLDER
=================================*/
const getImagesByFolder = async (req: Request) => {
  const { folder } = req.params;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;

  const folderExist = await FolderModel.findOne({ _id: folder });
  if (!folderExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
  }

  const totalImages = await ImageGalleryModel.countDocuments({
    folder: folderExist._id,
  });

  const images = await ImageGalleryModel.find({
    folder: folderExist._id,
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  return {
    images,
    folder: folderExist.name,
    meta: {
      total: totalImages,
      page,
      limit,
      totalPages: Math.ceil(totalImages / limit),
    },
  };
};

/* ===============================
   GET FOLDERS
=================================*/
const getFolders = async (req: Request) => {
  const searchableFields = ['name'];

  const folderQuery = new QueryBuilder(FolderModel.find(), req.query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const [meta, result] = await Promise.all([
    folderQuery.countTotal(),
    folderQuery.modelQuery.lean(),
  ]);

  return { meta, result };
};

/* ===============================
   CREATE IMAGE (UPLOAD)
=================================*/
const createImage = async (req: Request): Promise<string> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const files = req.files as Express.Multer.File[];
    const { folder } = req.body;

    if (!files || files.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Please upload images');
    }

    if (!folder) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Please provide a folder id'
      );
    }

    const folderDoc = await FolderModel.findOne({ _id: folder }).session(
      session
    );

    if (!folderDoc) {
      throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    const uploadedImages: any[] = [];

    for (const file of files) {
      const validationError = imageValidator(file.size, file.mimetype);
      if (validationError) {
        throw new AppError(httpStatus.BAD_REQUEST, validationError);
      }

      const fileNameWithoutExtension = file.originalname
        .split('.')
        .slice(0, -1)
        .join('.');

      const imageName = `quickhire-${Date.now()}-${fileNameWithoutExtension}`;

      const { secure_url, public_id } =
        (await sendImageToCloudinary(
          imageName,
          file.path,
          folder
        )) as UploadApiResponse;

      uploadedImages.push({
        url: secure_url,
        public_id,
        folder: folderDoc._id,
      });
    }

    if (uploadedImages.length > 0) {
      const insertedImages = await ImageGalleryModel.insertMany(
        uploadedImages,
        { session }
      );

      await FolderModel.findByIdAndUpdate(folderDoc._id, {
        $addToSet: {
          images: {
            $each: insertedImages.map((image) => image._id),
          },
        },
      }).session(session);
    }

    await session.commitTransaction();

    return 'Images uploaded successfully';
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  } finally {
    session.endSession();
  }
};

/* ===============================
   DELETE IMAGE
=================================*/
const deleteImage = async (body: {
  id: string;
  public_id: string;
}) => {
  const { id, public_id } = body;

  const image = await ImageGalleryModel.findById(id);
  if (!image) {
    throw new AppError(httpStatus.NOT_FOUND, 'Image not found');
  }

  await cloudinaryConfig.uploader.destroy(public_id);

  await ImageGalleryModel.findByIdAndDelete(id);

  return {
    success: true,
    message: 'Image deleted successfully',
  };
};

/* ===============================
   CREATE FOLDER
=================================*/
const createFolder = async (req: Request) => {
  const { name } = req.body;

  if (!name) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a folder name'
    );
  }

  const folder = await FolderModel.createFolder(name);

  return folder;
};

/* ===============================
   DELETE FOLDER
=================================*/
const deleteFolder = async (req: Request) => {
  const { id } = req.params;

  const folder = await FolderModel.findById(id);

  if (!folder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
  }

  if (folder.images.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Folder has images. Delete images first'
    );
  }

  await FolderModel.findByIdAndDelete(id);

  return 'Folder deleted successfully';
};

export const imageGalleryService = {
  getAllImages,
  getImagesByFolder,
  createImage,
  deleteImage,
  createFolder,
  deleteFolder,
  getFolders,
};