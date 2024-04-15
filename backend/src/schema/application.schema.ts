import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),

    email: string({
      required_error: " Mail is required",
    }),

    address: string({
      required_error: " Location is required",
    }),

    phoneNo: string({
      required_error: "Phone number is required",
    }),
    
    coverLetter: any(),

    document: any(),

    job: string({
      required_error: "Job id  is required",
    })
  }),
};

export const createApplicationSchema = object({
  ...payload,
});

export const deleteApplicationSchema = object({
  params: object({
    applicationId: string(),
  }),
});

export const getApplicationFromJobSchema = object({
  params: object({
    jobId: string(),
  }),
});

export const getApplicationSchema = object({
  params: object({
    applicationId: string(),
  }),
});




export type CreateApplicationInput = TypeOf<typeof createApplicationSchema>;
export type ReadApplicationInput = TypeOf<typeof getApplicationFromJobSchema>;
export type GetApplicationInput = TypeOf<typeof getApplicationSchema>;
export type DeleteApplicationInput = TypeOf<typeof deleteApplicationSchema>;
