import { NextFunction, Request, Response } from "express";
import {
  deleteContact,
  findAllContacts, findContact,createContact
} from "../service/contact.service";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import { deleteContactInput, getContactInput,createContactInput} from "../schema/contact.schema";
var colors = require("colors");

export async function getAllContactsHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contacts = await findAllContacts();
      return res.json({
        status: "success",
        msg: "Get all contacts success",
        data: contacts,
      });
    } catch (error: any) {
      console.error(colors.red("msg:", error.message));
      next(new AppError("Internal server error", 500));
    }
  }

  export async function getContactsHandler(
    req: Request<getContactInput["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contactId=req.params.contactId
      const contact = await findContact({contactId});
      return res.json({
        status: "success",
        msg: "Get Contacts success",
        data: contact,
      });
    } catch (error: any) {
      console.error(colors.red("msg:", error.message));
      next(new AppError("Internal server error", 500));
    }
  }

  export async function deleteContactHandler(
    req: Request<deleteContactInput["params"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contactId = req.params.contactId;
      const contact = await findContact({contactId });
  
      if (!contact) {
        next(new AppError("Contact does not exist", 404));
      }
  
      await deleteContact({contactId});
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

  export async function createContactsHandler(
    req: Request<createContactInput["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
        const body = req.body;
        const contact = await createContact(body);
        return res.json({
          status: "success",
          msg: "Create success",
          data: contact,
        });
      } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
      }
  }