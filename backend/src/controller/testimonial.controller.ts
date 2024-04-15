import { NextFunction, Request, Response } from "express";
import { CreateTestimonialInput, DeleteTestimonialInput, UpdateTestimonialInput} from "../schema/testimonial.schema";
import { createTestimonial,deleteTestimonial,findAndUpdateTestimonial,findAllTestimonial,findTestimonial } from "../service/testimonial.service";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createTestimonialHandler(req: Request<{}, {}, CreateTestimonialInput["body"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const image = files["image"][0];
    console.log(files["image"])
    const front = await uploadSingleFile(image);
    

    const body = req.body;
    const testimonial = await createTestimonial({ ...body, image: front});
    return res.json({
      status: "success",
      msg: "Create success",
      data: testimonial,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}


export async function updateTestimonialHandler(req: Request<UpdateTestimonialInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const testimonialId = req.params.testimonialId;
    const testimonial = await findTestimonial({ testimonialId });
    if (!testimonial) {
      next(new AppError("Testimonial detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = testimonial.image;
    
    if (files && files["image"]) {
      const image = files["image"][0];
      img1 = await uploadSingleFile(image);
    }

    const updatedTestimonial = await findAndUpdateTestimonial(
      { testimonialId },
      { ...req.body, image: img1},
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedTestimonial,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getTestimonialHandler(req: Request<UpdateTestimonialInput["params"]>, res: Response, next: NextFunction) {
  try {
    const testimonialId = req.params.testimonialId;
    const testimonial = await findTestimonial({ testimonialId });

    if (!testimonial) {
      next(new AppError("Testimonial does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: testimonial,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteTestimonialHandler(req: Request<DeleteTestimonialInput["params"]>, res: Response, next: NextFunction) {
  try {
    const testimonialId = req.params.testimonialId;
    const testimonial = await findTestimonial({ testimonialId });

    if (!testimonial) {
      next(new AppError("Testimonial does not exist", 404));
    }

    await deleteTestimonial({ testimonialId });
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

export async function getAllTestimonialHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const testimonials = await findAllTestimonial();
    return res.json({
      status: "success",
      msg: "Get all testimonial success",
      data: testimonials,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}