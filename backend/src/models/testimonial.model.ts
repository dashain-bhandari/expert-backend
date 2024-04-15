import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TestimonialInput {
  name: string;
  description: string;
  image: string;
}

export interface TestimonialDocument extends TestimonialInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new mongoose.Schema(
  {
    testimonialId: {
      type: String,
      required: true,
      unique: true,
      default: () => `testimonial_${nanoid()}`,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const TestimonialModel = mongoose.model<TestimonialDocument>("Testimonial", testimonialSchema);

export default TestimonialModel;
