
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
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = "https://hxkfcxzouhixqcbjidis.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4a2ZjeHpvdWhpeHFjYmppZGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMjc4NTAsImV4cCI6MjAyNjkwMzg1MH0.7YAj-6vGndKU8uaQp8pd7AqbKKuUmcfEaTL4rb2zZVk";
const supabase = createClient(supabaseUrl, supabaseKey);

// export async function fbLogInHandler(
//     req: Request<{}, {}, CreateUserInput["body"]>,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const existingUserWithEmail = await findUser({ email: req.body.email });
//       if (existingUserWithEmail) {
//         const accessToken = jwt.sign(
//           {user:existingUserWithEmail},
//           `${process.env.AUTH_SECRET_KEY}`,
//           {
//             expiresIn: "1d",
//           }
//         );
//         console.log("user",existingUserWithEmail);
//         console.log("token",accessToken);
//         return res.status(201).json({
//           status: "success",
//           msg: "Log in success",
//           accessToken: accessToken,
//         });
//       }
  
//       const token = crypto.randomBytes(20).toString("hex");
//       const accessToken = jwt.sign(
//         {user:existingUserWithEmail},
//         `${process.env.AUTH_SECRET_KEY}`,
//         {
//           expiresIn: "1d",
//         }
//       );
//       console.log("token",accessToken);
//       const createdUser = await createUser({
//         ...req.body,
//         verifyToken: token,
//         isVerified: true,
//       });
//       console.log("token:", token);
//       return res.status(201).json({
//         status: "success",
//         msg: "Register success",
//         data: createdUser,
//         accessToken: accessToken,
//       });
//     } catch (error: any) {
//       console.error(colors.red("msg:", error.message));
//       next(new AppError("Internal server error", 500));
//     }
//   }

  export async function fbLogInHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { access_token, expires_in, provider_token, refresh_token } = req.body;
  
      // Verify the Supabase session
      console.log(req.body)
      if (!access_token || !provider_token) {
        return res.status(400).json({ message: 'Missing required data' });
      }
    
      // Fetch the user's profile from Facebook Graph API
      const fbResponse = await axios.get('https://graph.facebook.com/v13.0/me', {
        params: {
          fields: 'id,name,email',
          access_token: provider_token,
        },
      });
      console.log(fbResponse)
      const { id, name, email } = fbResponse.data;
      const token = crypto.randomBytes(20).toString("hex");
      // Save the user to MongoDB
      const accessToken = jwt.sign(
                {user:email},
                `${process.env.AUTH_SECRET_KEY}`,
                {
                  expiresIn: "1d",
                }
              );
              console.log("token",accessToken);
              const createdUser = await createUser({
                
                fullName:name,
                email,
                username:"ddd",
                password:"ddd",
                role:"user",
                verifyToken: token,
                isVerified: true,
              });
             
              return res.status(201).json({
                status: "success",
                msg: "Register success",
                data: createdUser,
                accessToken: accessToken,
              });
    } catch (error:any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
