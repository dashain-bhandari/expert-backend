import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import enquiryModel, { enquiryDocument, enquiryInput } from "../models/enquiry.model";

export async function createEnquiry(input: enquiryInput) {
  console.log(input)
  const result = (await enquiryModel.create(input));
  return result;
}

export async function findEnquiry(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.findOne(query, {}, options).populate("deal").populate("service").populate("package")
  return result;
}

export async function deleteEnquiry(query: FilterQuery<enquiryDocument>) {
  return enquiryModel.deleteOne(query);
}


//find enquiryofparticulardeal
export async function findEnquiryOfParticularDeal(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("deal");
  return result;
}

//find enquiryofparticularservice
export async function findEnquiryOfParticularService(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("service");
  return result;
}

export async function findEnquiryOfParticularPackage(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("package");
  return result;
}

//find enquiry of all deals
export async function findAllDealEnquiries(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("deal");
  return result;
}

//find enquiry of all packages
export async function findAllPackageEnquiries(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("package");
  return result;
}

//find enquiry of all services
export async function findAllServiceEnquiries(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.find(query, {}, options).populate("service");
  return result;
}

//find service enquiry info
export async function findAServiceEnquiryInfo(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.findOne(query, {}, options).populate("service");
  return result;
}
//find deal enquiry info
export async function findADealEnquiryInfo(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.findOne(query, {}, options).populate("deal");
  return result;
}

//find package enquiry info
export async function findAPackageEnquiryInfo(query: FilterQuery<enquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await enquiryModel.findOne(query, {}, options).populate("package");
  return result;
}

export async function findAllEnquiries( ){
  const result = await enquiryModel.find().populate("deal").populate("service");
  return result;
}

export async function findAndUpdateStatus(query: FilterQuery<enquiryDocument>, update: UpdateQuery<enquiryDocument>, options: QueryOptions) {
  return enquiryModel.findOneAndUpdate(query, update, options);
}