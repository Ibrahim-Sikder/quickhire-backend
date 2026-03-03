/* eslint-disable no-unused-vars */
import { Model, Document, Types } from 'mongoose';

export interface Gallery extends Document {
  public_id: string;
  url: string;
  folder: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IFolder extends Document {
  _id: Types.ObjectId;
  name: string;
  images: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface GalleryModel extends Model<Gallery> {
  isImageExists(public_id: string): Promise<boolean>;
}

export interface IFolderModel extends Model<IFolder> {
  createFolder(name: string): Promise<IFolder>;
  deleteFolder(name: string): Promise<void>;
}
