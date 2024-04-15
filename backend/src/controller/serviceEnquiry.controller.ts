import { NextFunction, Request, Response } from "express";
import {
  createEnquiryInput,
  ReadServiceEnquiryInput,
  deleteEnquiryInput,
  getEnquiryInfoInput
} from "../schema/enquiry.schema";
import {
  createEnquiry,
  deleteEnquiry,
  findAServiceEnquiryInfo,
  findAllServiceEnquiries,
  findEnquiry,
  findEnquiryOfParticularService,
} from "../service/enquiry.service";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import { uploadMultipleFiles } from "../middleware/uploadMultipleFiles";
var colors = require("colors");

export async function createEnquiryHandler(
  req: Request<{}, {}, createEnquiryInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };
    console.log(files["document"])
    const body = req.body;
   
    if(files["document"].length>4)
    {
      return res.json({
        status: "Fail",
        msg: "The maximum documents limit is 4."
      })
    }
     const uploadedFileUrls = await uploadMultipleFiles(files["document"]);//files["document"] is array of images with fieldname document
    console.log(uploadedFileUrls);
   
    const enquiry = await createEnquiry({
      ...body,
      document: uploadedFileUrls,
    });
    return res.json({
      status: "success",
      msg: "Create success",
      data: enquiry,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

// to return all Enquirys of a particular service from its serviceId given as params
export async function getServiceEnquiryHandler(
  req: Request<ReadServiceEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceId = req.params.serviceId;
    const service = await findEnquiryOfParticularService({ service: { $eq: serviceId } });

    if (!service) {
      next(new AppError("Company doesn't have any service Enquiries", 404));
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

//returns all existing service enquiries
export async function getAllServiceEnquiriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceEnquiries = await findAllServiceEnquiries({ service: { $exists: true } });
    return res.json({
      status: "success",
      msg: "Get all deal Enquiry success",
      data: serviceEnquiries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//delete
export async function deleteServiceEnquiryHandler(
  req: Request<deleteEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findEnquiry({ enquiryId });

    if (!enquiry) {
      next(new AppError("Service Enquiry does not exist", 404));
    }

    await deleteEnquiry({enquiryId});
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

export async function getServiceEnquiryInfoHandler(
  req: Request<getEnquiryInfoInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findAServiceEnquiryInfo({$and:[
      {enquiryId: enquiryId},
      {service: { $exists: true }}]
    });
    if (!enquiry) {
      next(new AppError("No enquiries", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: enquiry,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}