import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    
    description: string({
      required_error: "Description is required",
    }),

    heading: string({
      required_error: "Heading is required",
    }),

    businessIdea: string({
        required_error: "Business idea is required",
      }),
  
      businessConcept: string({
        required_error: "Business Concept is required",
      }),
      company: string({
        required_error: "Company is required",
      }),
    contentImage: any(),
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

export const getDealFromCompanySchema=object({
  params:object({
    companyId:string({
      required_error: "companyId is required",
    })
  })
})


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
export type ReadDealFromCompanyInput = TypeOf<typeof getDealFromCompanySchema>;

// export type GetDealInfoInput=TypeOf<typeof getDealInfoSchema>;