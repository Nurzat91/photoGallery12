import mongoose, {Types} from "mongoose";
import User from "./User";
import {Photo} from "../types";

const Schema = mongoose.Schema;
const PhotoGallerySchema = new Schema<Photo>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User not found!",
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const PhotoGallery = mongoose.model("PhotoGallery", PhotoGallerySchema);

export default PhotoGallery;