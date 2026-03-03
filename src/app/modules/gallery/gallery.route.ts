/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { imageGalleryController } from './gallery.controller';

import {
  deleteImageFromGallerySchema,
  uploadImageToGallerySchema,
  createFolderSchema,
} from './gallery.validation';
import { upload } from '../../../utils/sendImageToCloudinary';
import { Protected } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.get('/all', imageGalleryController.getAllImages);
router.get(
  '/folder/:folder',
  // Protected('admin', 'super_admin'),
  imageGalleryController.getImagesByFolder
);
router.post(
  '/upload',
  upload,
  // Protected('admin', 'super_admin'),
  validateRequest(uploadImageToGallerySchema),
  imageGalleryController.createImage
);

router.post(
  '/delete',
  // Protected('admin', 'super_admin'),
  validateRequest(deleteImageFromGallerySchema),
  imageGalleryController.deleteImage
);

router.get('/folders', imageGalleryController.getFolders);

router.post(
  '/folder',
  // Protected('admin', 'super_admin'),
  validateRequest(createFolderSchema),
  imageGalleryController.createFolder
);

router.delete(
  '/folder/:id',
  // Protected('admin', 'super_admin'),
  imageGalleryController.deleteFolder
);

export const galleryRoutes = router;
