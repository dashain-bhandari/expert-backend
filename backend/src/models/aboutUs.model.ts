import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { array, string } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface aboutUsInput {
  story: string;
  vision: string;
  mission: string;
  storyImage: string;
  visionImage: string;
  missionImage: string;
}

export interface aboutUsDocument extends aboutUsInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const aboutUsSchema = new mongoose.Schema(
  {
    aboutUsId: {
      type: String,
      required: true,
      unique: true,
      default: () => `aboutUs_${nanoid()}`,
    },
    story: { type: String, required: true },
    vision: { type: String, required: true },
    mission: { type: String, required: true },
    storyImage: { type: String, required: true },
    visionImage: { type: String, required: true },
    missionImage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AboutUsModel = mongoose.model<aboutUsDocument>("AboutUs", aboutUsSchema);

export default AboutUsModel;
