import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FaqModel, { FaqDocument, FaqInput } from "../models/faq.model";

export async function createFaq(input: FaqInput) {
  const result = await FaqModel.create(input);
  return result;
}

export async function findFaq(query: FilterQuery<FaqDocument>, options: QueryOptions = { lean: true }) {
  const result = await FaqModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateFaq(query: FilterQuery<FaqDocument>, update: UpdateQuery<FaqDocument>, options: QueryOptions) {
  return FaqModel.findOneAndUpdate(query, update, options);
}

export async function deleteFaq(query: FilterQuery<FaqDocument>) {
  return FaqModel.deleteOne(query);
}

export async function findAllFaq() {
  const result = await FaqModel.find();
  return result;
}


