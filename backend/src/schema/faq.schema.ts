import { object,string, TypeOf } from "zod";

const payload = {
  body: object({
    heading: string({
      required_error: "Heading is required",
    }),

    description: string({
      required_error: "Description is required",
    })
  }),
};

const params = {
  params: object({
    faqId: string({
      required_error: "faqId is required",
    }),
  }),
};

export const createFaqSchema = object({
  ...payload,
});

export const updateFaqSchema = object({
  ...payload,
  ...params,
});

export const deleteFaqSchema = object({
  ...params,
});

export const getFaqSchema = object({
  ...params,
});

export type CreateFaqInput = TypeOf<typeof createFaqSchema>;
export type UpdateFaqInput = TypeOf<typeof updateFaqSchema>;
export type ReadFaqInput = TypeOf<typeof getFaqSchema>;
export type DeleteFaqInput = TypeOf<typeof deleteFaqSchema>;
