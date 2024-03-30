import express from "express";
import mongoose, {HydratedDocument} from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import role from "../middleware/role";
import PhotoGallery from "../models/PhotoGallery";
import {imagesUpload} from "../multer";

const PhotoGalleryRouter = express.Router();

PhotoGalleryRouter.get('/', async (req, res, next) => {
  try {
    const photo = await PhotoGallery.find().populate('author', 'displayName');

    return res.send(photo);
  } catch(e) {
    return next(e);
  }
});

PhotoGalleryRouter.get('/:id', role, async (req, res, next) => {
  try {
    const response = await PhotoGallery.find({_id: req.params.id}).populate('author', 'displayName');
    return res.send(response);
  } catch {
    return res.sendStatus(500);
  }
});

PhotoGalleryRouter.post('/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
      const data = await PhotoGallery.create({
        author: user?._id,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      });
      return res.send(data);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  });

PhotoGalleryRouter.delete("/:id", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    let deleted;
    if (user?.role === "admin") {
      deleted = await PhotoGallery.deleteOne({_id: req.params.id});
    } else {
      deleted = await PhotoGallery.deleteOne({
        _id: req.params.id,
        author: user?._id,
      });
    }
    if (deleted.deletedCount === 1) {
      return res.send({message: "deleted"});
    } else {
      res.status(404).send({message: "cant delete"});
    }
  } catch(e) {
    return next(e);
  }
});

export default PhotoGalleryRouter;