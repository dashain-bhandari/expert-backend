import { NextFunction, Request, Response } from "express";
import {
  CreateApplicationInput,
  DeleteApplicationInput,
  GetApplicationInput,
  ReadApplicationInput,
} from "../schema/application.schema";
import {
  createApplication,
  deleteApplication,
  findAllApplication,
  findAndUpdateApplication,
  findApplication,
  findApplications,
} from "../service/application.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { uploadMultipleFiles } from "../middleware/uploadMultipleFiles";
var colors = require("colors");

export async function createApplicationHandler(
  req: Request<{}, {}, CreateApplicationInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };
    let img1 = "";
    if (files["coverLetter"]) {
      const coverLetter = files["coverLetter"][0];
      console.log(coverLetter);
      img1 = await uploadSingleFile(coverLetter);
    }

    if (files["document"]?.length > 4) {
      return res.json({
        status: "Fail",
        msg: "The maximum documents limit is 4.",
      });
    }
    console.log(files)
    const uploadedFileUrls = await uploadMultipleFiles(files["document"]); //files["document"] is array of images with fieldname document
    console.log(uploadedFileUrls);

    const body = req.body;
    const application = await createApplication({
      ...body,
      coverLetter: img1,
      document: uploadedFileUrls,
    });
    return res.json({
      status: "success",
      msg: "Create success",
      data: application,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getApplicationHandler(
  req: Request<GetApplicationInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const applicationId = req.params.applicationId;
    const application = await findApplication({ applicationId });

    if (!application) {
      next(new AppError("Application does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: application,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteApplicationHandler(
  req: Request<DeleteApplicationInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const applicationId = req.params.applicationId;
    const application = await findApplication({ applicationId });

    if (!application) {
      next(new AppError("Application does not exist", 404));
    }
    await deleteApplication({ applicationId });

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

export async function getAllApplicationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const companies = await findAllApplication();
    return res.json({
      status: "success",
      msg: "Get all applications success",
      data: companies,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// find comoany based on categories
export async function getApplicationFromJobHandler(
  req: Request<ReadApplicationInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const jobId = req.params.jobId;
    const applications = await findApplications({ job: { $eq: jobId } });

    if (!applications) {
      next(new AppError("Application does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: applications,
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
