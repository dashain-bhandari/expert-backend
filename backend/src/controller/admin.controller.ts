import { NextFunction, Request, Response } from "express";
import {
  findAndUpdateUser,
  findUser,
  validatePassword,
} from "../service/user.service";
import AppError from "../utils/appError";
import { LoginUserInput } from "../schema/user.schema";
var colors = require("colors");
import jwt from "jsonwebtoken";

export async function changeRoles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const userId = req.params.userId;
    const user = await findUser({ userId });
    if (!user) {
      next(new AppError("User detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    const updatedUser = await findAndUpdateUser({ userId }, body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Role change success",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function loginAdminHandler(
  req: Request<{}, {}, LoginUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    if (user.role === "user") {
      return res.status(403).send("Unauthorized access");
    }
    // Generate a token with the user payload and secret key
    const accessToken = jwt.sign({ user }, `${process.env.AUTH_SECRET_KEY}`, {
      expiresIn: "1d",
    });
    console.log(accessToken);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

    res.status(200).json({
      msg: "Login success",
      success: true,
      accessToken: accessToken,
      user: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}
