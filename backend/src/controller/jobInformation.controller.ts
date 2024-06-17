import { NextFunction, Request, Response } from "express";
import { CreateJobInformationInput, UpdateJobInformationInput } from "../schema/jobInformation.schema";
import { createJobInformation, deleteJobInformation, findAllJobInformation, findAndUpdateJobInformation, findJobInformation } from "../service/jobInformation.service";
import AppError from "../utils/appError";
var colors = require("colors");

export async function createJobInformationHandler(req: Request<{}, {}, CreateJobInformationInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const jobInformation = await createJobInformation(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: jobInformation,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateJobInformationHandler(req: Request<UpdateJobInformationInput["params"]>, res: Response, next: NextFunction) {
  try {
    const jobId = req.params.jobId;
    const updatedJobInformation = await findAndUpdateJobInformation({ jobId:jobId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedJobInformation,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getJobInformationHandler(req: Request<UpdateJobInformationInput["params"]>, res: Response, next: NextFunction) {
  try {
    const jobId = req.params.jobId;
    const jobInformation = await findJobInformation({ jobId });

    if (!jobInformation) {
      next(new AppError("JobInformation does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: jobInformation,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteJobInformationHandler(req: Request<UpdateJobInformationInput["params"]>, res: Response, next: NextFunction) {
  try {
    const jobId = req.params.jobId;
    const jobInformation = await findJobInformation({ jobId:jobId });

    if (!jobInformation) {
      next(new AppError("JobInformation does not exist", 404));
    }

    await deleteJobInformation({ jobId });
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

export async function getAllJobInformationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const jobInformations = await findAllJobInformation();
    return res.json({
      status: "success",
      msg: "Get all JobInformation success",
      data: jobInformations,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
