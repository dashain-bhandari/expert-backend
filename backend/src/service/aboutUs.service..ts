import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import AboutUsModel, {
  aboutUsDocument,
  aboutUsInput,
} from "../models/aboutUs.model";

export async function createAboutUs(input: aboutUsInput) {
  console.log(input);
  const result = await AboutUsModel.create(input);
  return result;
}




