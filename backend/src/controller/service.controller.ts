import { NextFunction, Request, Response } from "express";
import { CreateServiceInput, DeleteServiceInput, ReadServiceInput, UpdateServiceInput } from "../schema/service.schema";
import { createService, deleteService, findAllService, findAndUpdateService, findService } from "../service/service.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createServiceHandler(req: Request<{}, {}, CreateServiceInput["body"]>, res: Response, next: NextFunction) {
  try {
    console.log(req.files);

    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const normalImage = files["normalImage"][0];

    const normal = await uploadSingleFile(normalImage);

    const body = req.body;
    const service = await createService({ ...body, normalImage: normal });
    return res.json({
      status: "success",
      msg: "Create success",
      data: service,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateServiceHandler(req: Request<UpdateServiceInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const serviceId = req.params.serviceId;
    const service = await findService({ serviceId });
    if (!service) {
      next(new AppError("Service detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img2 = service.normalImage;
    if (files && files["normalImage"]) {
      const normalImage = files["normalImage"][0];
      img2 = await uploadSingleFile(normalImage);
    }

    const updatedService = await findAndUpdateService(
      { serviceId },
      { ...req.body, normalImage: img2 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedService,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getServiceHandler(req: Request<ReadServiceInput["params"]>, res: Response, next: NextFunction) {
  try {
    const serviceId = req.params.serviceId;
    const service = await findService({ serviceId });

    if (!service) {
      next(new AppError("Service does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: service,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteServiceHandler(req: Request<DeleteServiceInput["params"]>, res: Response, next: NextFunction) {
  try {
    const serviceId = req.params.serviceId;
    const service = await findService({ serviceId });

    if (!service) {
      next(new AppError("Service does not exist", 404));
    }

    await deleteService({ serviceId });
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

export async function getAllServiceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const services = await findAllService();
    return res.json({
      status: "success",
      msg: "Get all services success",
      data: services,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
