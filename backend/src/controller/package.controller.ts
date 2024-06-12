import { NextFunction, Request, Response } from "express";
import { CreatePackageInput, DeletePackageInput, ReadPackageInput, UpdatePackageInput } from "../schema/package.schema";
import { createPackage, deletePackage, findAllPackage, findAndUpdatePackage, findPackage } from "../service/package.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createPackageHandler(req: Request<{}, {}, CreatePackageInput["body"]>, res: Response, next: NextFunction) {
  try {
    console.log(req.files);

    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const normalImage = files["normalImage"][0];

    const normal = await uploadSingleFile(normalImage);

    const body = req.body;
    const packages = await createPackage({ ...body, normalImage: normal });
    return res.json({
      status: "success",
      msg: "Create success",
      data: packages,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updatePackageHandler(req: Request<UpdatePackageInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const packageId = req.params.packageId;
    const packages = await findPackage({ packageId });
    if (!packages) {
      next(new AppError("Package detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img2 = packages.normalImage;
    if (files && files["normalImage"]) {
      const normalImage = files["normalImage"][0];
      img2 = await uploadSingleFile(normalImage);
    }

    const updatedPackage = await findAndUpdatePackage(
      { packageId },
      { ...req.body, normalImage: img2 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedPackage,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getPackageHandler(req: Request<ReadPackageInput["params"]>, res: Response, next: NextFunction) {
  try {
    const packageId = req.params.packageId;
    const packages = await findPackage({ packageId });

    if (!packages) {
      next(new AppError("Package does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: packages,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deletePackageHandler(req: Request<DeletePackageInput["params"]>, res: Response, next: NextFunction) {
  try {
    const packageId = req.params.packageId;
    const packages = await findPackage({ packageId });

    if (!packages) {
      next(new AppError("Package does not exist", 404));
    }

    await deletePackage({ packageId });
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

export async function getAllPackageHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const packages = await findAllPackage();
    return res.json({
      status: "success",
      msg: "Get all services success",
      data: packages,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
