import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CareerInput {
  category: string;
  categoryImage: string;
}

export interface CareerDocument extends CareerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const careerSchema = new mongoose.Schema(
  {
    careerId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${nanoid()}`,
    },
    bgImage: { type: String, required: true },
    normalImage: { type: String, required: true },
    employeeResponsibilities: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CareerModel = mongoose.model<CareerDocument>(
  "Career",
  careerSchema
);

export default CareerModel;
