import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import JobInformationModel, { JobInformationDocument, JobInformationInput } from "../models/jobInformation.model";

export async function createJobInformation(input: JobInformationInput) {
  const result = await JobInformationModel.create(input);
  return result;
}

export async function findJobInformation(query: FilterQuery<JobInformationDocument>, options: QueryOptions = { lean: true }) {
  const result = await JobInformationModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateJobInformation(query: FilterQuery<JobInformationDocument>, update: UpdateQuery<JobInformationDocument>, options: QueryOptions) {
  return JobInformationModel.findOneAndUpdate(query, update, options);
}

export async function deleteJobInformation(query: FilterQuery<JobInformationDocument>) {
  return JobInformationModel.deleteOne(query);
}

export async function findAllJobInformation() {
  const result = await JobInformationModel.find();
  return result;
}


