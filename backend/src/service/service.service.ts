import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ServiceModel, { ServiceDocument, ServiceInput } from "../models/service.model";

export async function createService(input: ServiceInput) {
  const result = await ServiceModel.create(input);
  return result;
}

export async function findService(query: FilterQuery<ServiceDocument>, options: QueryOptions = { lean: true }) {
  const result = await ServiceModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateService(query: FilterQuery<ServiceDocument>, update: UpdateQuery<ServiceDocument>, options: QueryOptions) {
  return ServiceModel.findOneAndUpdate(query, update, options);
}

export async function deleteService(query: FilterQuery<ServiceDocument>) {
  return ServiceModel.deleteOne(query);
}

export async function findAllService() {
  const result = await ServiceModel.find();
  return result;
}
