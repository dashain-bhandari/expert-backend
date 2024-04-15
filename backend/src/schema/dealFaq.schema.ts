import { object,string, TypeOf } from "zod";


const payload = {
  body: object({
    heading: string({
      required_error: "Heading is required",
    }),

    description: string({
      required_error: "Description is required",
    }),

    deal: string({
        required_error: "Deal is required",
      })

  }),
};

export const createDealFaqSchema = object({
  ...payload,
});

export const updateDealFaqSchema = object({
  ...payload,
  params: object({
    dealFaqId: string(),
  })
});

export const deleteDealFaqSchema = object({
  params: object({
    dealFaqId: string(),
  }),
});

export const getDealFaqSchema = object({
  params: object({
    dealId: string(),
  }),
});



export type CreateDealFaqInput = TypeOf<typeof createDealFaqSchema>;
export type UpdateDealFaqInput = TypeOf<typeof updateDealFaqSchema>;
export type ReadDealFaqInput = TypeOf<typeof getDealFaqSchema>;

export type DeleteDealFaqInput = TypeOf<typeof deleteDealFaqSchema>;
