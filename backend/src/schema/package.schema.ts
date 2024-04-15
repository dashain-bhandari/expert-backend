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
name:string({
required_error:"name is required"
}),
    normalImage: any(),
  }),
};

const params = {
  params: object({
    packageId: string({
      required_error: "packageId is required",
    }),
  }),
};

export const createPackageSchema = object({
  ...payload,
});

export const updatePackageSchema = object({
  ...payload,
  ...params,
});

export const deletePackageSchema = object({
  ...params,
});

export const getPackageSchema = object({
  ...params,
});

export type CreatePackageInput = TypeOf<typeof createPackageSchema>;
export type UpdatePackageInput = TypeOf<typeof updatePackageSchema>;
export type ReadPackageInput = TypeOf<typeof getPackageSchema>;
export type DeletePackageInput = TypeOf<typeof deletePackageSchema>;
