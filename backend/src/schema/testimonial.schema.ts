import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),

    description: string({
      required_error: "Description is required",
    }),

    image: any()
  }),
};

const params = {
  params: object({
    testimonialId: string({
      required_error: "testimonialId is required",
    }),
  }),
};

export const createTestimonialSchema = object({
  ...payload,
});

export const updateTestimonialSchema = object({
  ...payload,
  ...params,
});

export const deleteTestimonialSchema = object({
  ...params,
});

export const getTestimonialSchema = object({
  ...params,
});

export type CreateTestimonialInput = TypeOf<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = TypeOf<typeof updateTestimonialSchema>;
export type ReadTestimonialInput = TypeOf<typeof getTestimonialSchema>;
export type DeleteTestimonialInput = TypeOf<typeof deleteTestimonialSchema>;
