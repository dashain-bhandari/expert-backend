import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BlogInput {
  category: CategoryDocument["_id"];
  contentImage: string;
  author: string;
  title: string;
  content: string;
  authorImage:string;
}

export interface BlogDocument extends BlogInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
      unique: true,
      default: () => `blog_${nanoid()}`,
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    contentImage: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorImage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model<BlogDocument>("Blog", blogSchema);

export default BlogModel;
