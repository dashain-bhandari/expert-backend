import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CategoryInput {
  category:string;
  categoryImage:string
type:string;
noOfBlogs?:number;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${nanoid()}`,
    },
    category: { type: String, required: true },
    categoryImage: { type: String, required: true },
    type: { type: String, required: true },
    noOfBlogs:{type:Number,default:0}
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;
