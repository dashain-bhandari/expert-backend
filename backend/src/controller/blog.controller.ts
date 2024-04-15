import { NextFunction, Request, Response } from "express";
import {
  CreateBlogInput,
  DeleteBlogInput,
  ReadBlogInput,
  UpdateBlogInput,
  GetBlogFromCategoryInput,
} from "../schema/blog.schema";
import {
  createBlog,
  deleteBlog,
  findAllBlog,
  findAndUpdateBlog,
  findBlog,
  findBlogs,
} from "../service/blog.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { findAndUpdateCategory } from "../service/category.service";
var colors = require("colors");

export async function createBlogHandler(
  req: Request<{}, {}, CreateBlogInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };

    const contentImage = files["contentImage"][0];
    
    const authorImage = files["authorImage"][0];
    console.log(contentImage);
    const img1 = await uploadSingleFile(contentImage);
    const img2 = await uploadSingleFile(authorImage);

    const body = req.body;
    const blog = await createBlog({
      ...body,
      contentImage: img1,
      authorImage:img2
    });

    const category = await findAndUpdateCategory(
      { _id: req.body.category },
      { $inc: { noOfBlogs: 1 } },
      { new: true }
    );
    console.log(category);
    return res.json({
      status: "success",
      msg: "Create success",
      blog: blog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getBlogHandler(
  req: Request<ReadBlogInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const blogId = req.params.blogId;
    const blog = await findBlog({ blogId });

    if (!blog) {
      next(new AppError("Blog does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: blog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateBlogHandler(
  req: Request<UpdateBlogInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files?: { [fieldname: string]: Express.Multer.File[] };
    }; // '?' to make files optional

    const blogId = req.params.blogId;
    const blog = await findBlog({ blogId });
    if (!blog) {
      next(new AppError("Blog detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = blog.contentImage;
    if (files && files["contentImage"]) {
      const contentImage = files["contentImage"][0];
      img1 = await uploadSingleFile(contentImage);
    }
    let img2 = blog.authorImage;
    if (files && files["authorImage"]) {
      const authorImage = files["authorImage"][0];
      img2 = await uploadSingleFile(authorImage);
    }

    const updatedBlog = await findAndUpdateBlog(
      { blogId },
      { ...req.body, contentImage: img1 ,authorImage:img2},
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function deleteBlogHandler(
  req: Request<DeleteBlogInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const blogId = req.params.blogId;
    const blog = await findBlog({ blogId });

    if (!blog) {
      next(new AppError("Blog does not exist", 404));
    }
    await deleteBlog({ blogId });

    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllBlogsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const blogs = await findAllBlog();
    return res.json({
      status: "success",
      msg: "Get all blogs success",
      data: blogs,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBlogFromCategoryHandler(
  req: Request<GetBlogFromCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const blog = await findBlogs({ category: { $eq: categoryId } });

    if (!blog) {
      next(new AppError("Blog does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: blog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
