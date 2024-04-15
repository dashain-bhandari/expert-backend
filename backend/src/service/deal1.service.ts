import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import DealModel1, { DealDocument, DealInput } from "../models/deal1.model";

export async function createDeal(input: DealInput) {
  const result = await DealModel1.create(input);
  return result;
}

export async function findDeal(query: FilterQuery<DealDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealModel1.findOne(query, {}, options).populate("category");
  return result;
}

export async function findAndUpdateDeal(query: FilterQuery<DealDocument>, update: UpdateQuery<DealDocument>, options: QueryOptions) {
  return DealModel1.findOneAndUpdate(query, update, options);
}

export async function deleteDeal(query: FilterQuery<DealDocument>) {
  return DealModel1.deleteOne(query);
}

export async function findAllDeal() {
  const result = await DealModel1.find().populate("category");
  return result;
}

export async function findDeals(query: FilterQuery<DealDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealModel1.find(query, {}, options).populate(
   "category"
  );
  return result;
}