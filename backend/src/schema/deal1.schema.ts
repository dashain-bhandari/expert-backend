import { object, number, string, array, TypeOf, any } from "zod";

const payload = {
  body: object({
    description: string({
      required_error: "Description is required",
    }),

    heading: string({
      required_error: "Heading is required",
    }),

   
    businessConcept: string({
      required_error: "Business Concept is required",
    }),

    contentImage: any(),

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

    conceptOfBusiness: array(
      string({
        required_error: "Concept of business is required",
      })
    ),
    companyLogo: any(),
  }),
};

const params = {
  params: object({
    dealId: string({
      required_error: "dealId is required",
    }),
  }),
};

export const createDealSchema = object({
  ...payload,
});

export const updateDealSchema = object({
  ...payload,
  ...params,
});

export const deleteDealSchema = object({
  ...params,
});

export const getDealSchema = object({
  ...params,
});

export const getDealFromCategorySchema = object({
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
});

// export const getDealInfoSchema=object({
//   body:object({
//     category: string(),
//     company:string()
//   })
// })

export type CreateDealInput = TypeOf<typeof createDealSchema>;
export type UpdateDealInput = TypeOf<typeof updateDealSchema>;
export type ReadDealInput = TypeOf<typeof getDealSchema>;
export type DeleteDealInput = TypeOf<typeof deleteDealSchema>;
export type ReadDealFromCategoryInput = TypeOf<
  typeof getDealFromCategorySchema
>;

// export type GetDealInfoInput=TypeOf<typeof getDealInfoSchema>;
