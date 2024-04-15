import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TestimonialModel, { TestimonialDocument, TestimonialInput } from "../models/testimonial.model";

export async function createTestimonial(input: TestimonialInput) {
  const result = await TestimonialModel.create(input);
  return result;
}

export async function findTestimonial(query: FilterQuery<TestimonialDocument>, options: QueryOptions = { lean: true }) {
  const result = await TestimonialModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateTestimonial(query: FilterQuery<TestimonialDocument>, update: UpdateQuery<TestimonialDocument>, options: QueryOptions) {
  return TestimonialModel.findOneAndUpdate(query, update, options);
}

export async function deleteTestimonial(query: FilterQuery<TestimonialDocument>) {
  return TestimonialModel.deleteOne(query);
}

export async function findAllTestimonial() {
  const result = await TestimonialModel.find();
  return result;
}
