import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PackageModel, { PackageDocument, PackageInput } from "../models/package.model";

export async function createPackage(input: PackageInput) {
  const result = await PackageModel.create(input);
  return result;
}

export async function findPackage(query: FilterQuery<PackageDocument>, options: QueryOptions = { lean: true }) {
  const result = await PackageModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdatePackage(query: FilterQuery<PackageDocument>, update: UpdateQuery<PackageDocument>, options: QueryOptions) {
  return PackageModel.findOneAndUpdate(query, update, options);
}

export async function deletePackage(query: FilterQuery<PackageDocument>) {
  return PackageModel.deleteOne(query);
}

export async function findAllPackage() {
  const result = await PackageModel.find();
  return result;
}
