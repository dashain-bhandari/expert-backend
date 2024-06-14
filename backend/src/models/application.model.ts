import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { JobInformationDocument } from "./jobInformation.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ApplicationInput {
  name: string;
  phoneNo: string;
  email: string;
  address: string;
  document: string[];
  coverLetter:string;
  job: JobInformationDocument["_id"];
  viewed?:boolean
}

export interface ApplicationDocument extends ApplicationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `application_${nanoid()}`,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    viewed: { type: Boolean, required: false,default:false },
    phoneNo: { type: String, required: true },
    job: {type: mongoose.Schema.Types.ObjectId, ref: "JobInformation" },
    document: { type: [String], required: true },
    coverLetter: { type: String, required:true},
  },
  {
    timestamps: true,
  }
);

const ApplicationModel = mongoose.model<ApplicationDocument>(
  "Application",
  applicationSchema
);

export default ApplicationModel;
