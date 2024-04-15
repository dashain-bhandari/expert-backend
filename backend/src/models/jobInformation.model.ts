import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface JobInformationInput {
  position: string;
  timing: string;
  jobType: string;
  jobDuties:string[];
  qualification:string[];
  salary:string;
  contentImage?:string
}

export interface JobInformationDocument
  extends JobInformationInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      default: () => `job_${nanoid()}`,
    },
    position: { type: String, required: true },
    timing: { type: String, required: true },
    jobType: { type: String, required: true },
    jobDuties: { type: [String], required: true },
    qualification: { type: [String], required: true },
    salary: { type: String, required: true },
    contentImage:{ type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const JobInformationModel = mongoose.model<JobInformationDocument>(
  "JobInformation",
  jobSchema
);

export default JobInformationModel;
