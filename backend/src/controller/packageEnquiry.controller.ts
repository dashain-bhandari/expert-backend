import { NextFunction, Request, Response } from "express";
import {
  createEnquiryInput,
  ReadServiceEnquiryInput,
  deleteEnquiryInput,
  getEnquiryInfoInput,
  ReadPackageEnquiryInput
} from "../schema/enquiry.schema";
import {
  createEnquiry,
  deleteEnquiry,
  findAPackageEnquiryInfo,
  findAServiceEnquiryInfo,
  findAllPackageEnquiries,
  findAllServiceEnquiries,
  findEnquiry,
  findEnquiryOfParticularPackage,
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
export async function getPackageEnquiryHandler(
  req: Request<ReadPackageEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const packageId = req.params.packageId;
    const packages = await findEnquiryOfParticularPackage({ package: { $eq: packageId } });

    if (!packages) {
      next(new AppError("Company doesn't have any package Enquiries", 404));
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

//returns all existing service enquiries
export async function getAllPackageEnquiriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const packageEnquiries = await findAllPackageEnquiries({ package: { $exists: true } });
    return res.json({
      status: "success",
      msg: "Get all package Enquiry success",
      data: packageEnquiries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//delete
export async function deletePackageEnquiryHandler(
  req: Request<deleteEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findEnquiry({ enquiryId });

    if (!enquiry) {
      next(new AppError("Package Enquiry does not exist", 404));
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

export async function getPackageEnquiryInfoHandler(
  req: Request<getEnquiryInfoInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findAPackageEnquiryInfo({$and:[
      {enquiryId: enquiryId},
      {package: { $exists: true }}]
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