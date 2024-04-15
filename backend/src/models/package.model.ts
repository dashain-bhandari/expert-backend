import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { string } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PackageInput {
  heading: string;
  descriptionLong: string;
  expertises:string[],
  bgImage: string;
  normalImage: string;
}

export interface PackageDocument extends PackageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
      default: () => `package_${nanoid()}`,
    },
    heading: { type: String, required: true },
    descriptionLong: { type: String, required: true },
    expertises: { type: Array(String), required: true },
    bgImage: { type: String, required: true },
    normalImage: { type: String, required: true },
    name:{type:String,required:true}
  },
  {
    timestamps: true,
  }
);

const PackageModel = mongoose.model<PackageDocument>("Package", packageSchema);

export default PackageModel;
