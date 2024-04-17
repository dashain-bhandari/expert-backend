require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  createUser,
  deleteUser,
  findAllUser,
  findAndUpdateUser,
  findUser,
  findUsers,
  validatePassword,
} from "../service/user.service";
import { generateHashedPassword } from "../utils/generateHashedPassword";
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../schema/user.schema";
var colors = require("colors");
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModel from "../models/user.model";
import crypto from "crypto";
import { uploadSingleFile } from "../middleware/uploadSingleFile";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const existingUserWithEmail = await findUser({ email: req.body.email });
    if (existingUserWithEmail) {
      return next(new AppError("User with this email already exists", 409));
    }

    const existingUserWithUsername = await findUser({
      username: req.body.username,
    });
    if (existingUserWithUsername) {
      return next(new AppError("User with this username already exists", 409));
    }

    const token = crypto.randomBytes(20).toString("hex");
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
      from: "epeak",
      to: req.body.email,
      subject: "Verify Email ✔",
      html: `<div>
    <div class="container">
     <div class="content">
         <p class="heading">Please click on button below to verify your email.</p>
         <a class=" verify-button" href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify
             Email</a>
     </div>
     <div class="footer">
         <p>Thanks and Regards, epeak .</p>
         <p>For any queries contact us here:</p>
         <p>Phone: 98948465474323</p>     
 </div>
 </div>
   </div>`,
    });

    const hashedPassword = await generateHashedPassword(req.body.password);

    const createdUser = await createUser({
      ...req.body,
      password: hashedPassword,
      verifyToken: token,
    });
    return res.status(201).json({
      status: "success",
      msg: "Register success",
      data: createdUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
     
      next(new AppError("Invalid email or password", 401));
    }

    // Generate a token with the user payload and secret key
    const accessToken = jwt.sign({ user }, `${process.env.AUTH_SECRET_KEY}`, {
      expiresIn: "1d",
    });
    console.log(accessToken);
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // });

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

export async function updateUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const update = req.body;

    const user = await findUser({ userId });
    if (!user) {
      next(new AppError("User does not exist", 404));
    }
    console.log(update);
    const existingUserWithEmail = await findUser({ email: update.email });
    if (existingUserWithEmail) {
      return next(new AppError("User with this email already exists", 409));
    }

    const existingUserWithUsername = await findUser({
      username: update.username,
    });
    if (existingUserWithUsername) {
      return next(new AppError("User with this username already exists", 409));
    }
    const updatedUser = await findAndUpdateUser({ userId }, update, {
      new: true,
    });
    console.log(updatedUser);
    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await findUser({ userId });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await findAllUser();
    return res.json({
      status: "success",
      msg: "Get all user success",
      data: users,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await findUser({ userId });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    await deleteUser({ userId });
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

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // my custom header
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, `envSecretKey`);
    // Attach the decoded payload to the request for later use in the route handlers
    req.user = decoded;

    console.log(decoded);
    next();
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};

export async function getUserFromTokenHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const decodedUser: any = req.user;
    const user = await findUser({ userId:decodedUser.userId });
    console.log(req.user);
   if(user)
    {
      return res.json({
        status: "success",
        msg: "Get user from token success",
        data:user,
      });
    }
    else{
      next(new AppError("User doesn't exist", 404));
    }
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function verifyEmailHander(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await UserModel.findOne({ verifyToken: req.params.token });

    if (!user) {
      next(new AppError("Token does not exist", 404));
    }

    const updated = await UserModel.findOneAndUpdate(
      { verifyToken: req.params.token },
      { isVerified: true, verifyToken: "" },
      { new: true }
    );

    return res.json({
      status: "success",
      msg: "Verify success",
      data: updated,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getUserByUsernameHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.params.username;
    const user = await findUser({ username });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// Assuming you have a UserModel with a role field to designate user roles

export async function registerSuperAdminHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    // Check if the current user is a super admin (you may have your own logic for this)
    if (req.body.email === process.env.SUPER_ADMIN_EMAIL) {
      console.log(req.body.email);
      console.log(process.env.SUPER_ADMIN_EMAIL);

      const existingUserWithEmail = await findUser({ email: req.body.email });
      if (existingUserWithEmail) {
        return next(new AppError("User with this email already exists", 409));
      }

      const hashedPassword = await generateHashedPassword(req.body.password);
      const createdUser = await createUser({
        ...req.body,
        role: "super-admin",
        isVerified: true,
        password: hashedPassword,
      });
      return res.status(201).json({
        status: "success",
        msg: "Super admin registration success",
        data: createdUser,
      });
    }

    next(new AppError("Super Admin email is not correct", 404));
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getOnlyUsers(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUsers({ role: "user" });
    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getOnlyUsersAndAdmin(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUsers({ role: "admin" });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function logOutHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      status: "success",
      msg: "Log out success",
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function forgotPwHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const existingUserWithEmail = await findUser({ email: req.body.email });
    if (!existingUserWithEmail) {
      return next(new AppError("User with this email does not exist", 409));
    }
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);

    const token = crypto.randomBytes(20).toString("hex");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "iamruined1@gmail.com",
        pass: "vniu riko oimc qdzw",
      },
    });
    const userEmail = req.body.email;
    console.log(userEmail);
    const info = await transporter.sendMail({
      from: "expert",
      to: req.body.email,
      subject: "Forgot Password",
      html: `<div>
    <div class="container">
     <div class="content">
         <p class="heading">Please click on button below to verify your email.</p>
         <a class=" verify-button" href="https://expert-vercel.vercel.app/forgot-password/${token}?email=${userEmail}&expiry=${expiryTime.getTime()}">Recover password</a>
     </div>
     <div class="footer">
         <p>Thanks and Regards, expert .</p>
         <p>For any queries contact us here:</p>
         <p>Phone: 98948465474323</p>     
 </div>
 </div>
   </div>`,
    });

    return res.status(201).json({
      status: "success",
      msg: "Sent email success",
      data: info,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function generatePasswordHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body;
    console.log(req.body);
    const hashedPassword = await generateHashedPassword(req.body.password);
    const updatedUser = await findAndUpdateUser(
      { email: update.email },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updatePasswordHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const { oldPw, newPw, confirmPw } = req.body;
    console.log(req.body);
    const user = await validatePassword({
      email: req.user.email,
      password: oldPw,
    });

    const hashedPassword = await generateHashedPassword(req.body.newPw);
    if (!user) {
      return res.status(401).send("Invalid password");
    }
    const updatedUser = await findAndUpdateUser(
      { email: req.user.email },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function googleLogInHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const existingUserWithEmail = await findUser({ email: req.body.email });
    if (existingUserWithEmail) {
      const accessToken = jwt.sign(
        { user: existingUserWithEmail },
        `${process.env.AUTH_SECRET_KEY}`,
        {
          expiresIn: "1d",
        }
      );
      console.log(existingUserWithEmail);
      console.log(accessToken);
      return res.status(201).json({
        status: "success",
        msg: "Log in success",
        accessToken: accessToken,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const accessToken = jwt.sign(
      { user: existingUserWithEmail },
      `${process.env.AUTH_SECRET_KEY}`,
      {
        expiresIn: "1d",
      }
    );
    const createdUser = await createUser({
      ...req.body,
      verifyToken: token,
      isVerified: true,
    });
    console.log("token:", accessToken);
    return res.status(201).json({
      status: "success",
      msg: "Register success",
      data: createdUser,
      accessToken: accessToken,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

//by admin
export async function updateAdminPasswordHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const hashedPassword = await generateHashedPassword(req.body.newPw);
    const updatedUser = await findAndUpdateUser(
      { userId: req.body.userId },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateProfileHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };

    const profile = files["profile"][0];

    const img1 = await uploadSingleFile(profile);

    const body = req.body;

    const updatedUser = await findAndUpdateUser(
      { userId: req.body.userId },
      { profile: img1 },
      {
        new: true,
      }
    );

    if (updatedUser) {
      return res.json({
        status: "success",
        msg: "Update success",
        data: updatedUser,
      });
    }
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}
