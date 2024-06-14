import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ApplicationModel, { ApplicationDocument, ApplicationInput } from "../models/application.model";

export async function createApplication(input: ApplicationInput) {
  const result = await ApplicationModel.create(input);
  return result;
}

export async function findApplication(query: FilterQuery<ApplicationDocument>, options: QueryOptions = { lean: true }) {
  const result = await ApplicationModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateApplication(query: FilterQuery<ApplicationDocument>, update: UpdateQuery<ApplicationDocument>, options: QueryOptions) {
  return ApplicationModel.findOneAndUpdate(query, update, options);
}

export async function deleteApplication(query: FilterQuery<ApplicationDocument>) {
  return ApplicationModel.deleteOne(query);
}

export async function findAllApplication() {
  const result = await ApplicationModel.find().populate("job");
  return result;
}

export async function findApplications(query: FilterQuery<ApplicationDocument>, options: QueryOptions = { lean: true }) {
    const result = await ApplicationModel.find(query, {}, options).populate("job");
    return result;
  }

// export async function findCategorys(query: FilterQuery<CategoryDocument>, options: QueryOptions = { lean: true }) {
//   const result = await CategoryModel.find(query, {}, options);
//   return result;
// }