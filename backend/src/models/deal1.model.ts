import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CategoryDocument } from "./category.model";
import { CompanyDocument } from "./company.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface DealInput {
  heading: string;
  description: string;
  contentImage: string;
  businessConcept: string;
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  category: CategoryDocument["_id"];
  conceptOfBusiness: string[];
  boost?:boolean;
}

export interface DealDocument extends DealInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const dealSchema = new mongoose.Schema(
  {
    dealId: {
      type: String,
      required: true,
      unique: true,
      default: () => `deal_${nanoid()}`,
    },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    contentImage: { type: String, required:false },
    businessConcept: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLocation: { type: String, required: true },
    companyMail: { type: String, required: true },
    companyLogo: { type: String, required: true },
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    conceptOfBusiness: { type: [String], required: true },
    boost: { type: Boolean, required: false ,default:false},
  },
  {
    timestamps: true,
  }
);

const DealModel1 = mongoose.model<DealDocument>("DealModel", dealSchema);

export default DealModel1;
