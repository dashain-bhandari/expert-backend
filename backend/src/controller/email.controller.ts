import { NextFunction, Request, Response } from "express";
import {
  createEmailInput,
  ReadEmailInput,
  deleteEmailInput,
  updateEmailInput,
} from "../schema/email.schema";
import {
  createEmail,
  deleteEmail,
  findAllEmail,
  findAndUpdateStatus,
  findEmail,
} from "../service/email.service";
import AppError from "../utils/appError";
var colors = require("colors");
import nodemailer from "nodemailer";
import { uploadMultipleFiles } from "../middleware/uploadMultipleFiles";

export async function createEmailHandler(
  req: Request<{}, {}, createEmailInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const email = await createEmail(req.body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: email,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getEmailHandler(
  req: Request<ReadEmailInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const emailId = req.params.emailId;
    const email = await findEmail({ emailId });

    if (!email) {
      next(new AppError("Email does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: email,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteEmailHandler(
  req: Request<deleteEmailInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const emailId = req.params.emailId;
    const email = await findEmail({ emailId });

    if (!email) {
      next(new AppError("email does not exist", 404));
    }

    await deleteEmail({ emailId });
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

export async function getAllEmailHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const emails = await findAllEmail();
    return res.json({
      status: "success",
      msg: "Get all emails success",
      data: emails,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateEmailHandler(
  req: Request<updateEmailInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const emailId = req.params.emailId;
    const updatedEmail = await findAndUpdateStatus(
      { emailId },
      { readStatus: true },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedEmail,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function sendEmailHandler(
  req: Request<{}, {}, createEmailInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };

    const body = req.body;
    console.log(typeof files["documents"]);
    console.log(body);
    if (files && files["documents"]?.length > 4) {
      return res.json({
        status: "Fail",
        msg: "The maximum documents limit is 4.",
      });
    }
    let attachments: any = [];
    let uploadedFileUrls: any = [];
    if (files["documents"]) {
      console.log(files["documents"]);
      uploadedFileUrls = await uploadMultipleFiles(files["documents"]); //files["document"] is array of images with fieldname document
      console.log(uploadedFileUrls);

      // Prepare attachments array
      attachments = uploadedFileUrls.map((url: any) => ({
        path: url, // Assuming 'url' is the URL of the uploaded file
      }));
    }

    // Send email with attachments
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "expertbusiness777@gmail.com",
        pass: "hgdi yaec hacs lxwf",
      },
    });

    const info = await transporter.sendMail({
      from: "Expert",
      to: req.body.recieverMail,
      subject: req.body.subject,
      html: req.body.body,
      attachments: attachments || [],
    });

    const email = await createEmail({
      ...req.body,
      documents: uploadedFileUrls,
    });
    return res.status(201).json({
      status: "success",
      msg: "Email sent success",
      data: email,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}
