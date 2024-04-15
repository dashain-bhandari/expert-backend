import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ContactModel, {
  contactDocument,
  contactInput,
} from "../models/contactUs.model";

export async function createContact(input: contactInput) {
  console.log(input);
  const result = await ContactModel.create(input);
  return result;
}

export async function findContact(
  query: FilterQuery<contactDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await ContactModel.findOne(query, {}, options);
  return result;
}

export async function findAllContacts(
  ) {
    const result = await ContactModel.find();
    return result;
  }

export async function deleteContact(query: FilterQuery<contactDocument>) {
  return ContactModel.deleteOne(query);
}
