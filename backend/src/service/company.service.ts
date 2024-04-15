import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CompanyModel, { CompanyDocument, CompanyInput } from "../models/company.model";

export async function createCompany(input: CompanyInput) {
  const result = await CompanyModel.create(input);
  return result;
}

export async function findCompany(query: FilterQuery<CompanyDocument>, options: QueryOptions = { lean: true }) {
  const result = await CompanyModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateCompany(query: FilterQuery<CompanyDocument>, update: UpdateQuery<CompanyDocument>, options: QueryOptions) {
  return CompanyModel.findOneAndUpdate(query, update, options);
}

export async function deleteCompany(query: FilterQuery<CompanyDocument>) {
  return CompanyModel.deleteOne(query);
}

export async function findAllCompany() {
  const result = await CompanyModel.find();
  return result;
}

export async function findCompanies(query: FilterQuery<CompanyDocument>, options: QueryOptions = { lean: true }) {
    const result = await CompanyModel.find(query, {}, options).populate("category");
    return result;
  }

// export async function findCategorys(query: FilterQuery<CategoryDocument>, options: QueryOptions = { lean: true }) {
//   const result = await CategoryModel.find(query, {}, options);
//   return result;
// }