import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateUserDetailInput, UpdateUserDetailInput } from "../schema/userDetail.schema";
import { createUserDetail, findUserDetail, findAndUpdateUserDetail, deleteUserDetail, getUserDetailByUser } from "../service/userDetail.service";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createUSerDetailHandler(req: Request<{}, {}, CreateUserDetailInput["body"]>, res: Response, next: NextFunction) {
  try {
    // const userId = res.locals.user._id;
    // const body = req.body;
    const userDetail = await createUserDetail(req.body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: userDetail,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateUSerDetailHandler(req: Request<UpdateUserDetailInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // Note the '?' to make files optional

    const userDetailId = req.params.userDetailId;
    const userDetail = await findUserDetail({ userDetailId });
    if (!userDetail) {
      next(new AppError("User detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img2 = userDetail.backgroundImage; // Initialize img2 with the existing image

    if (files && files["backgroundImage"]) {
      const backgroundImage = files["backgroundImage"][0];
      img2 = await uploadSingleFile(backgroundImage);
    }

    let img1 = userDetail.profileImage;
    if (files && files["profileImage"]) {
      const profileImage = files["profileImage"][0];
      img1 = await uploadSingleFile(profileImage);
    }

    let img3 = userDetail.organizationImage;
    if (files && files["organizationImage"]) {
      const organizationImage = files["organizationImage"][0];
      img3 = await uploadSingleFile(organizationImage);
    }

    const updatedUserDetail = await findAndUpdateUserDetail(
      { userDetailId },
      { ...req.body, profileImage: img1, backgroundImage: img2, organizationImage: img3 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUserDetail,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getUSerDetailHandler(req: Request<UpdateUserDetailInput["params"]>, res: Response, next: NextFunction) {
  try {
    const userDetailId = req.params.userDetailId;
    const userDetail = await findUserDetail({ userDetailId });

    if (!userDetail) {
      next(new AppError("User detail does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: userDetail,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteUSerDetailHandler(req: Request<UpdateUserDetailInput["params"]>, res: Response, next: NextFunction) {
  try {
    const userDetailId = req.params.userDetailId;
    const userDetail = await findUserDetail({ userDetailId });

    if (!userDetail) {
      next(new AppError("User detail does not exist", 404));
    }

    await deleteUserDetail({ userDetailId });
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

// export async function getUserDetailByUserHandler(req: Request<{ userId: string }>, res: Response, next: NextFunction) {
export async function getUserDetailByUserHandler(req: any, res: Response, next: NextFunction) {
  try {
    // Access req.user here
    const decodedUser: any = req.user;

    const { userId } = req.params;
    const userDetail = await getUserDetailByUser(userId);

    if (!userDetail) {
      return next(new AppError("User detail does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: userDetail,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}
