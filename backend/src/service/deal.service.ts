import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DealModel, { DealDocument, DealInput } from "../models/deal.model";

export async function createDeal(input: DealInput) {
  const result = await DealModel.create(input);
  return result;
}

export async function findDeal(query: FilterQuery<DealDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateDeal(query: FilterQuery<DealDocument>, update: UpdateQuery<DealDocument>, options: QueryOptions) {
  return DealModel.findOneAndUpdate(query, update, options);
}

export async function deleteDeal(query: FilterQuery<DealDocument>) {
  return DealModel.deleteOne(query);
}

export async function findAllDeal() {
  const result = await DealModel.find();
  return result;
}

export async function findDeals(query: FilterQuery<DealDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealModel.find(query, {}, options).populate(
    {
      path:'company',
      populate:{
        path:'category'
      }
    }
  );
  return result;
}