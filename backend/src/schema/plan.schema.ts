import { object, number, string, TypeOf, any,array } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),

    heading: string({
      required_error: "Heading is required",
    }),

    description: string({
        required_error: "Heading is required",
      }),

    contentImage: any(),

})
};

export const createPlanSchema = object({
  ...payload,
});

export const deletePlanSchema = object({
  params: object({
    planId: string(),
  }),
});




export const getPlanSchema = object({
  params: object({
    planId: string(),
  }),
});

export const updatePlanSchema=object({
  params:object({
    planId:string()
  })
})

export type CreatePlanInput = TypeOf<typeof createPlanSchema>;
export type ReadPlanInput = TypeOf<typeof getPlanSchema>;
export type DeletePlanInput = TypeOf<typeof deletePlanSchema>;
export type UpdatePlanInput=TypeOf<typeof updatePlanSchema>;