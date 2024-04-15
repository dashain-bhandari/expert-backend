import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DealFaqModel, { DealFaqDocument, DealFaqInput } from "../models/dealFaq.model";

export async function createDealFaq(input: DealFaqInput) {
  const result = await DealFaqModel.create(input);
  return result;
}

export async function findDealFaqOfDeal(query: FilterQuery<DealFaqDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealFaqModel.find(query, {}, options).populate("deal");
  return result;
}


export async function findDealFaq(query: FilterQuery<DealFaqDocument>, options: QueryOptions = { lean: true }) {
  const result = await DealFaqModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateDealFaq(query: FilterQuery<DealFaqDocument>, update: UpdateQuery<DealFaqDocument>, options: QueryOptions) {
  return DealFaqModel.findOneAndUpdate(query, update, options).populate("deal");
}

export async function deleteDealFaq(query: FilterQuery<DealFaqDocument>) {
  return DealFaqModel.deleteOne(query);
}

export async function findAllDealFaq() {
  const result = await DealFaqModel.find().populate("deal");;
  return result;
}

export async function deleteDealFaqFromId(query: FilterQuery<DealFaqDocument>){
  return DealFaqModel.deleteOne(query);
}