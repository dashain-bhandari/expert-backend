import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { DealDocument } from "./deal.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface DealFaqInput {
  deal: DealDocument["_id"];
  heading: string;
  description: string;
}

export interface DealFaqDocument extends DealFaqInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const dealFaqSchema = new mongoose.Schema(
  {
    dealFaqId: {
      type: String,
      required: true,
      unique: true,
      default: () => `dealFaq_${nanoid()}`,
    },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
  },
  {
    timestamps: true,
  }
);

const DealFaqModel = mongoose.model<DealFaqDocument>("DealFaq", dealFaqSchema);

export default DealFaqModel;
