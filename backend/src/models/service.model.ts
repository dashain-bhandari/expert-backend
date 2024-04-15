import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { string } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ServiceInput {
  heading: string;
  descriptionLong: string;
  expertises:string[],
  bgImage: string;
  normalImage: string;
}

export interface ServiceDocument extends ServiceInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      default: () => `service_${nanoid()}`,
    },
    heading: { type: String, required: true },
    descriptionLong: { type: String, required: true },
    expertises: { type: Array(String), required: true },
    bgImage: { type: String, required: true },
    normalImage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model<ServiceDocument>("Service", serviceSchema);

export default ServiceModel;
