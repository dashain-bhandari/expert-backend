import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    employeeResponsibilities: string({
      required_error: "Employee responsibilities is required",
    }),

    bgImage: any(),
    normalImage: any(),
  }),
};

const params = {
  params: object({
    careerId: string({
      required_error: "careerId is required",
    }),
  }),
};

export const createCareerSchema = object({
  ...payload,
});

export const updateCareerSchema = object({
  ...payload,
  ...params,
});

export const deleteCareerSchema = object({
  ...params,
});

export const getCareerSchema = object({
  ...params,
});


export type CreateCareerInput = TypeOf<typeof createCareerSchema>;
export type UpdateCareerInput = TypeOf<typeof updateCareerSchema>;
export type ReadCareerInput = TypeOf<typeof getCareerSchema>;
export type DeleteCareerInput = TypeOf<typeof deleteCareerSchema>;
