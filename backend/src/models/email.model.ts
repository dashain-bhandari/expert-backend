import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { array, string } from "zod";
import { DealDocument } from "./deal.model";
import { ServiceDocument } from "./service.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface emailInput {
  recieverMail:string
  subject:string
  body:string
  documents?:string[]
  sender:string
}

export interface emailDocument extends emailInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const emailSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
      default: () => `enquiry_${nanoid()}`,
    },
    recieverMail: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true},
    documents: { type: [String], required: false},
    sender:{type: String, required: true}
    
  },
  {
    timestamps: true,
  }
);

const emailModel = mongoose.model<emailDocument>("email", emailSchema);

export default emailModel;
