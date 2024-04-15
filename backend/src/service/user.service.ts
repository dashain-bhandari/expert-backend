import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";
import bcrypt from "bcrypt";

export async function createUser(input: UserInput) {
  const user = await UserModel.create(input);
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
  const result = await UserModel.findOne(query, {}, options).select("-password");
  return result;
}

export async function findAllUser() {
  const users = await UserModel.find().select("-password");
  return users;
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
console.log(user)
  // const isValid = await user.comparePassword(password);
  if(user.gSub && !user.password)
  {
  // return omit(user.toJSON(), "password");
  return false;
  }
  else{
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid)
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
  }
}


export async function findUsers(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
  const result = await UserModel.find(query, {}, options).select("-password");
  return result;
}