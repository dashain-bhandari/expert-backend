import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import emailModel, { emailDocument, emailInput } from "../models/email.model";

export async function createEmail(input: emailInput) {
  console.log(input)
  const result = (await emailModel.create(input));
  return result;
}

export async function findEmail(query: FilterQuery<emailDocument>, options: QueryOptions = { lean: true }) {
  const result = await emailModel.findOne(query, {}, options)
  return result;
}

export async function findAndUpdateStatus(query: FilterQuery<emailDocument>, update: UpdateQuery<emailDocument>, options: QueryOptions) {
  return emailModel.findOneAndUpdate(query, update, options);
}

export async function findAllEmail() {
    const result = await emailModel.find()
    return result;
  }

export async function deleteEmail(query: FilterQuery<emailDocument>) {
  return emailModel.deleteOne(query);
}

