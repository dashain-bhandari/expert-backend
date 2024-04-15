import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";

export const requireSuperAdmin = (req: any, res: Response, next: NextFunction) => {

  console.log(req.headers)
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access token is missing" });
  }

  try {
    const decoded: any = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);

    if (decoded.user.role !== "super-admin") {
      return res
        .status(403)
        .json({
          error: true,
          message: "User is not authorized as super-admin",
        });
    }

    // Attach the decoded payload to the request for later use in the route handlers
    req.user = decoded.user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};
