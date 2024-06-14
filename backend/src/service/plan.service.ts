import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PlanModel, { PlanDocument, PlanInput } from "../models/plan.model";

export async function createPlan(input: PlanInput) {
  const result = await PlanModel.create(input);
  return result;
}

export async function findPlan(query: FilterQuery<PlanDocument>, options: QueryOptions = { lean: true }) {
  const result = await PlanModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdatePlan(query: FilterQuery<PlanDocument>, update: UpdateQuery<PlanDocument>, options: QueryOptions) {
  return PlanModel.findOneAndUpdate(query, update, options);
}

export async function deletePlan(query: FilterQuery<PlanDocument>) {
  return PlanModel.deleteOne(query);
}

export async function findAllPlan() {
  const result = await PlanModel.find();
  return result;
}


