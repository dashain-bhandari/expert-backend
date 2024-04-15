import { object, number, string, TypeOf, any, array } from "zod";

const payload = {
  body: object({
    heading: string({
      required_error: "Heading is required",
    }),

    descriptionLong: string({
      required_error: " description is required",
    }),

    expertises: array(string()) ,
    bgImage: any(),

    normalImage: any(),
  }),
};

const params = {
  params: object({
    serviceId: string({
      required_error: "serviceId is required",
    }),
  }),
};

export const createServiceSchema = object({
  ...payload,
});

export const updateServiceSchema = object({
  ...payload,
  ...params,
});

export const deleteServiceSchema = object({
  ...params,
});

export const getServiceSchema = object({
  ...params,
});

export type CreateServiceInput = TypeOf<typeof createServiceSchema>;
export type UpdateServiceInput = TypeOf<typeof updateServiceSchema>;
export type ReadServiceInput = TypeOf<typeof getServiceSchema>;
export type DeleteServiceInput = TypeOf<typeof deleteServiceSchema>;
