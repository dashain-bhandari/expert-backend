import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FaqInput {
  heading: string;
  description: string;
}

export interface FaqDocument extends FaqInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new mongoose.Schema(
  {
    faqId: {
      type: String,
      required: true,
      unique: true,
      default: () => `faq_${nanoid()}`,
    },
    heading: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const FaqModel = mongoose.model<FaqDocument>("Faq", faqSchema);

export default FaqModel;
