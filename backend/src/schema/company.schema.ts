import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    companyName: string({
      required_error: "Company Name is required",
    }),

    companyMail: string({
      required_error: "Company Mail is required",
    }),

    companyLocation: string({
      required_error: "Company Location is required",
    }),

    category: string({
      required_error: "Category Id is required",
    }),

    companyLogo: any(),
  }),
};

const params = {
  params: object({
    companyId: string({
      required_error: "companyId is required",
    }),
  }),
};

export const createCompanySchema = object({
  ...payload,
});

export const updateCompanySchema = object({
  ...payload,
  ...params,
});

export const deleteCompanySchema = object({
  ...params,
});

export const getCompanySchema = object({
  ...params,
});

export const getCompanyFromCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>;
export type UpdateCompanyInput = TypeOf<typeof updateCompanySchema>;
export type ReadCompanyInput = TypeOf<typeof getCompanySchema>;
export type DeleteCompanyInput = TypeOf<typeof deleteCompanySchema>;
export type GetCompanyFromCategoryInput = TypeOf<
  typeof getCompanyFromCategorySchema
>;
