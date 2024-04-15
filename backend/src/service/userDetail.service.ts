import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserDetailModel, { UserDetailDocument, UserDetailInput } from "../models/userDetail.model";

export async function createUserDetail(input: UserDetailInput) {
  const result = await UserDetailModel.create(input);
  return result;
}

export async function findUserDetail(query: FilterQuery<UserDetailDocument>, options: QueryOptions = { lean: true }) {
  const result = await UserDetailModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateUserDetail(query: FilterQuery<UserDetailDocument>, update: UpdateQuery<UserDetailDocument>, options: QueryOptions) {
  return UserDetailModel.findOneAndUpdate(query, update, options);
}

export async function deleteUserDetail(query: FilterQuery<UserDetailDocument>) {
  return UserDetailModel.deleteOne(query);
}

export async function getUserDetailByUser(userId: string) {
  const result = await UserDetailModel.findOne({ user: userId }).populate("user")
  return result;
}
