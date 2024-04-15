import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { array, string } from "zod";
import { DealDocument } from "./deal1.model";
import { ServiceDocument } from "./service.model";
import { PackageDocument } from "./package.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface enquiryInput {
  enquirerName: string;
  companyName: string;
  enquirerMail: string;
  enquirerContactNo: string;
  enquirerLocation: string;
  enquirerMessage?: string|undefined;
  document: string[];
  deal?: DealDocument["_id"]|undefined;
  service?:ServiceDocument["_id"]|undefined;
  package?:PackageDocument["_id"]|undefined;
  readStatus:string;
  message?:string;
}

export interface enquiryDocument extends enquiryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `enquiry_${nanoid()}`,
    },
    enquirerName: { type: String, required: true },
    enquirerLocation: { type: String, required: true },
    enquirerContactNo: { type: String, required: true },
    enquirerMessage: { type: String, required: false },
    companyName: { type: String, required: true },
    enquirerMail: { type: String, required: true },
    document: {type:[String], required: true },
    deal: { type: mongoose.Schema.Types.ObjectId, ref: "DealModel" ,required:false},
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" ,required:false},
    package:{type: mongoose.Schema.Types.ObjectId, ref: "Package" ,required:false},
    readStatus:{type:String,required:true,default:'false'},
    message:{type:String,required:false}
  },
  {
    timestamps: true,
  }
);

const enquiryModel = mongoose.model<enquiryDocument>("enquiry", enquirySchema);

export default enquiryModel;
