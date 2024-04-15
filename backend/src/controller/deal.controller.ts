import { NextFunction, Request, Response } from "express";
import {
  CreateDealInput,
  DeleteDealInput,
  ReadDealFromCompanyInput,
  ReadDealInput,
  UpdateDealInput,
} from "../schema/deal.schema";
import {
  createDeal,
  deleteDeal,
  findAllDeal,
  findAndUpdateDeal,
  findDeal,
  findDeals,
} from "../service/deal.service";

import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createDealHandler(
  req: Request<{}, {}, CreateDealInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };

    const contentImage = files["contentImage"][0];

    const img1 = await uploadSingleFile(contentImage);

    const body = req.body;
    const deal = await createDeal({
      ...body,
      contentImage: img1,
    });
    return res.json({
      status: "success",
      msg: "Create success",
      data: deal,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getDealHandler(
  req: Request<ReadDealInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const dealId = req.params.dealId;
    const deal = await findDeal({ dealId });

    if (!deal) {
      next(new AppError("Deal does not exist", 404));
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

export async function updateDealHandler(
  req: Request<UpdateDealInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files?: { [fieldname: string]: Express.Multer.File[] };
    }; // '?' to make files optional

    const dealId = req.params.dealId;
    const deal = await findDeal({ dealId });
    if (!deal) {
      next(new AppError("Deal detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = deal.contentImage;
    if (files && files["contentImage"]) {
      const contentImage = files["contentImage"][0];
      img1 = await uploadSingleFile(contentImage);
    }

    const updatedDeal = await findAndUpdateDeal(
      { dealId },
      { ...req.body, companyLogo: img1, contentImage: img1 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedDeal,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteDealHandler(
  req: Request<DeleteDealInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const dealId = req.params.dealId;
    const deal = await findDeal({ dealId });

    if (!deal) {
      next(new AppError("deal does not exist", 404));
    }
    await deleteDeal({ dealId });

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

export async function getAllDealHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deals = await findAllDeal();
    return res.json({
      status: "success",
      msg: "Get all deal success",
      data: deals,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getDealFromCompanyHandler(
  req: Request<ReadDealFromCompanyInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const companyId = req.params.companyId;
    const deal = await findDeals({ company: { $eq: companyId } });

    if (!deal) {
      next(new AppError("Deal does not exist", 404));
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

// //based on company and categories
// export async function getDeals(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { category, company } = req.query;
//     console.log(category);

//     let query: any = { category };
//     if (company) {
//       query = { ...query, companyName: company };
//     }
//     const deals = await findDeals(query);
//     if (!deals) {
//     }
//     return res.json({
//       status: "success",
//       msg: "Get all deal success",
//       data: deals,
//     });
//   } catch (error: any) {
//     console.error(colors.red("msg:", error.message));
//     next(new AppError("Internal server error", 500));
//   }
// }
