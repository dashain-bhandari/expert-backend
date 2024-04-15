import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CategoryDocument } from "./category.model";
import { CompanyDocument } from "./company.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface DealInput {
  heading: string;
  description: string;
  contentImage: string;
  businessIdea: string;
  businessConcept: string;
  // category: CategoryDocument["_id"];
  company: CompanyDocument["_id"];
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
    contentImage: { type: String, required: false },
    businessIdea: { type: String, required: true },
    businessConcept: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const DealModel = mongoose.model<DealDocument>("Deal", dealSchema);

export default DealModel;
