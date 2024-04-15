import { NextFunction, Request, Response } from "express";
import {
  CreateDealFaqInput,
  ReadDealFaqInput,
  UpdateDealFaqInput,
} from "../schema/dealFaq.schema";
import {
  createDealFaq,
  deleteDealFaq,
  findAllDealFaq,
  findAndUpdateDealFaq,
  findDealFaq,
  findDealFaqOfDeal,
} from "../service/dealFaq.service";
import AppError from "../utils/appError";
import mongoose from "mongoose";

var colors = require("colors");

export async function createDealFaqHandler(
  req: Request<{}, {}, CreateDealFaqInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const dealFaq = await createDealFaq(body);
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: dealFaq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//update deal faqs

export async function updateDealFaqHandler(
  req: Request<UpdateDealFaqInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const dealFaqId = req.params.dealFaqId;
    const dealFaq = await findDealFaq({ dealFaqId });
    if (!dealFaqId) {
      next(new AppError("Deal detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    const updatedDealFaq = await findAndUpdateDealFaq({ dealFaqId }, body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedDealFaq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// to return all faqs of a particular deal from its dealId given as params
export async function getDealFaqHandler(
  req: Request<ReadDealFaqInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const dealId = req.params.dealId;
    const deal = await findDealFaqOfDeal({ deal: { $eq: dealId } });

    if (!deal) {
      next(new AppError("Company doesn't have any faqs", 404));
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

//returns all existing deals
export async function getAllDealFaqHandler(
  req: Request 
  
  
  
  
  
  
  ,
  res: Response,
  next: NextFunction
) {
  try {
    const dealFaqs = await findAllDealFaq();
    return res.json({
      status: "success",
      msg: "Get all deal faq success",
      data: dealFaqs,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

//delete
export async function deleteDealFaqHandler(
  req: Request<UpdateDealFaqInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const dealFaqId = req.params.dealFaqId;
    const dealFaq = await findDealFaq({ dealFaqId });

    if (!dealFaq) {
      next(new AppError("Deal Faq does not exist", 404));
    }

    await deleteDealFaq({dealFaqId});
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



export async function getParticularDealFaqHandler(
  req: Request<UpdateDealFaqInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.params)
    const dealFaqId = req.params.dealFaqId;
    console.log(dealFaqId)
    const dealFaq = await findDealFaq({ dealFaqId });
    if (!dealFaqId) {
      next(new AppError("Deal detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    return res.json({
      status: "success",
      msg: "get success",
      data: dealFaq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
