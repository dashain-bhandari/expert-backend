import { NextFunction, Request, Response } from "express";
import {
  deleteEnquiry,
  findAllEnquiries, findAndUpdateStatus, findEnquiry
} from "../service/enquiry.service";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import { uploadMultipleFiles } from "../middleware/uploadMultipleFiles";
import { deleteEnquiryInput, updateEnquiryInput } from "../schema/enquiry.schema";
var colors = require("colors");

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

  export async function updateEnquiryHandler(req: Request<updateEnquiryInput["params"]>, res: Response, next: NextFunction) {
    try {
     const enquiryId=req.params.enquiryId
      const updatedEnquiry = await findAndUpdateStatus(
        { enquiryId },
        {readStatus:true},
        {
          new: true,
        }
      );
  
      return res.json({
        status: "success",
        msg: "Update success",
        data: updatedEnquiry,
      });
    } catch (error: any) {
      console.error(colors.red("msg:", error.message));
      next(new AppError("Internal server error", 500));
    }
  }

  export async function getEnquiryHandler(
    req: Request<updateEnquiryInput["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const enquiryId=req.params.enquiryId
      const enquiry = await findEnquiry({enquiryId});
      return res.json({
        status: "success",
        msg: "Get  Enquiry success",
        data: enquiry,
      });
    } catch (error: any) {
      console.error(colors.red("msg:", error.message));
      next(new AppError("Internal server error", 500));
    }
  }

  export async function deleteEnquiryHandler(
    req: Request<deleteEnquiryInput["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const enquiryId = req.params.enquiryId;
      const enquiry = await findEnquiry({ enquiryId });
  
      if (!enquiry) {
        next(new AppError("Enquiry does not exist", 404));
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