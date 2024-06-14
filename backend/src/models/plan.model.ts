import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PlanInput {
  title: string;
  heading: string;
  description: string;
  contentImage?:string;
}

export interface PlanDocument extends PlanInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new mongoose.Schema(
  {
    planId: {
      type: String,
      required: true,
      unique: true,
      default: () => `plan_${nanoid()}`,
    },
    title: { type: String, required: true },
    heading: { type: String, required: true },
    contentImage: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PlanModel = mongoose.model<PlanDocument>("Plan", planSchema);

export default PlanModel;
