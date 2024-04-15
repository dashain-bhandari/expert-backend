import { NextFunction, Request, Response } from "express";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  ReadCategoryInput,
  UpdateCategoryInput,
  GetCategoryInfoInput,
} from "../schema/category.schema";
import {
  createCategory,
  deleteCategory,
  findAllCategory,
  findAndUpdateCategory,
  findCategory,
  findCategories,
} from "../service/category.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };
    
    const categoryImage = files["categoryImage"][0];
    console.log(categoryImage);
    const img1 = await uploadSingleFile(categoryImage);

    const body = req.body;
    const category = await createCategory({
      ...body,
      categoryImage: img1
    });
    return res.json({
      status: "success",
      msg: "Create success",
      category: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getCategoryHandler(
  req: Request<ReadCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });

    if (!category) {
      next(new AppError("Category does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCategoryHandler(
  req: Request<UpdateCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files?: { [fieldname: string]: Express.Multer.File[] };
    }; // '?' to make files optional

    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });
    if (!category) {
      next(new AppError("Category detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = category.categoryImage;
    if (files && files["categoryImage"]) {
      const categoryImage = files["categoryImage"][0];
      img1 = await uploadSingleFile(categoryImage);
    }

   

    const updatedCategory = await findAndUpdateCategory(
      { categoryId },
      { ...req.body, categoryImage: img1},
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function deleteCategoryHandler(
  req: Request<DeleteCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });

    if (!category) {
      next(new AppError("category does not exist", 404));
    }
    await deleteCategory({ categoryId });

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

export async function getAllCategoriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await findCategories({type:"Deal"});
    return res.json({
      status: "success",
      msg: "Get all categories success",
      data: categories,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}