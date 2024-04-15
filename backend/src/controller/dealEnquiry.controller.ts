import { NextFunction, Request, Response } from "express";
import {
  createEnquiryInput,
  ReadDealEnquiryInput,
  deleteEnquiryInput,
  getEnquiryInfoInput,
} from "../schema/enquiry.schema";
import {
  createEnquiry,
  deleteEnquiry,
  findADealEnquiryInfo,
  findAllDealEnquiries,
  findAllEnquiries,
  findEnquiry,
  findEnquiryOfParticularDeal,
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
    console.log(files["document"]);
    const body = req.body;

    if (files["document"].length > 4) {
      return res.json({
        status: "Fail",
        msg: "The maximum documents limit is 4.",
      });
    }
    const uploadedFileUrls = await uploadMultipleFiles(files["document"]); //files["document"] is array of images with fieldname document
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

// to return all Enquirys of a particular deal from its dealId given as params
export async function getDealEnquiryHandler(
  req: Request<ReadDealEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const dealId = req.params.dealId;
    const deal = await findEnquiryOfParticularDeal({ deal: { $eq: dealId } });

    if (!deal) {
      next(new AppError("Company doesn't have any deal Enquiries", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: deal,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//returns all existing deal enquiries
export async function getAllDealEnquiriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dealEnquiries = await findAllDealEnquiries({
      deal: { $exists: true },
    });
    return res.json({
      status: "success",
      msg: "Get all deal Enquiry success",
      data: dealEnquiries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//delete
export async function deleteDealEnquiryHandler(
  req: Request<deleteEnquiryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findEnquiry({ enquiryId });

    if (!enquiry) {
      next(new AppError("Deal Enquiry does not exist", 404));
    }

    await deleteEnquiry({ enquiryId });
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

export async function getDealEnquiryInfoHandler(
  req: Request<getEnquiryInfoInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const enquiryId = req.params.enquiryId;
    const enquiry = await findADealEnquiryInfo({
      $and: [{ enquiryId: enquiryId }, { deal: { $exists: true } }],
    });

    if (!enquiry) {
      next(new AppError("Company doesn't have any enquiries", 404));
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

export async function getAllEnquiriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dealEnquiries = await findAllEnquiries();
    return res.json({
      status: "success",
      msg: "Get all deal Enquiry success",
      data: dealEnquiries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
