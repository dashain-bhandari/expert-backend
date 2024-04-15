import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CompanyInput {
  companyName: string;
  companyLocation: string;
  companyMail: string;
  companyLogo: string;
  category: CategoryDocument["_id"];
}

export interface CompanyDocument extends CompanyInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
      default: () => `company_${nanoid()}`,
    },
    companyName: { type: String, required: true },
    companyLocation: { type: String, required: true },
    companyMail: { type: String, required: true },
    companyLogo: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model<CompanyDocument>(
  "Company",
  companySchema
);

export default CompanyModel;
