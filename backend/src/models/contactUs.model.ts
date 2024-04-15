import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { array, string } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface contactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface contactDocument extends contactInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      required: true,
      unique: true,
      default: () => `contact_${nanoid()}`,
    },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model<contactDocument>("Contact", contactSchema);

export default ContactModel;
