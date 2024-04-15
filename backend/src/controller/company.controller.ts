import { NextFunction, Request, Response } from "express";
import {
  CreateCompanyInput,
  DeleteCompanyInput,
  GetCompanyFromCategoryInput,
  ReadCompanyInput,
  UpdateCompanyInput,
} from "../schema/company.schema";
import {
  createCompany,
  deleteCompany,
  findAllCompany,
  findAndUpdateCompany,
  findCompanies,
  findCompany,
} from "../service/company.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createCompanyHandler(
  req: Request<{}, {}, CreateCompanyInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };
    const companyLogo = files["companyLogo"][0];
    console.log(companyLogo);
    const img1 = await uploadSingleFile(companyLogo);

    const body = req.body;
    const company = await createCompany({
      ...body,
      companyLogo: img1,
    });
    return res.json({
      status: "success",
      msg: "Create success",
      data: company,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCompanyHandler(
  req: Request<ReadCompanyInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const companyId = req.params.companyId;
    const company = await findCompany({ companyId });

    if (!company) {
      next(new AppError("Comapny does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: company,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCompanyHandler(
  req: Request<UpdateCompanyInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files?: { [fieldname: string]: Express.Multer.File[] };
    }; // '?' to make files optional

    const companyId = req.params.companyId;
    const company = await findCompany({ companyId });
    if (!company) {
      next(new AppError("Company detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = company.companyLogo;
    if (files && files["companyLogo"]) {
      const companyLogo = files["companyLogo"][0];
      img1 = await uploadSingleFile(companyLogo);
    }



    const updatedCompany = await findAndUpdateCompany(
      { companyId },
      { ...req.body, companyLogo: img1 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCompany,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteCompanyHandler(
  req: Request<DeleteCompanyInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const companyId = req.params.companyId;
    const company = await findCompany({ companyId });

    if (!company) {
      next(new AppError("company does not exist", 404));
    }
    await deleteCompany({ companyId });

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

export async function getAllCompanyHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const companies = await findAllCompany();
    return res.json({
      status: "success",
      msg: "Get all companies success",
      data: companies,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// find comoany based on categories
export async function getCompanyFromCategoryHandler(
    req: Request<GetCompanyFromCategoryInput["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const categoryId = req.params.categoryId;
      const company = await findCompanies({ category:{$eq:categoryId} });
  
      if (!company) {
        next(new AppError("Company does not exist", 404));
      }
  
      return res.json({
        status: "success",
        msg: "Get success",
        data: company,
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
