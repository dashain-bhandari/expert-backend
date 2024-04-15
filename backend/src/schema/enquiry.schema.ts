import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    companyName: string({
      required_error: "Company Name is required",
    }),

    enquirerMail: string({
      required_error: "Enquirer Mail is required",
    }),

    enquirerLocation: string({
      required_error: "Enquirer Location is required",
    }),

    enquirerName: string({
      required_error: "Enquirer name is required",
    }),
    readStatus: string(),

    enquirerContactNo: string({
      required_error: "Enquirer Contact Number is required",
    }),
    enquirerMessage: string({
      required_error: "Enquirer message is required",
    }).optional(),

    document: any(),
    message: string().optional(),
    deal: string({
      required_error: "Deal id  is required",
    }).optional(),
    service: string({
      required_error: "Service id  is required",
    }).optional(),
    package:string({
      required_error: "Package id  is required",
    }).optional(),
  }).refine((data) => {
    // Ensure that either `deal` or `service` is provided, but not both
    if (!(data.deal === undefined) && !(data.service === undefined) && !(data.package === undefined)) {
      return {
        message:
          "Either Deal id or Service id or Package id should be provided, but not all",
      };
    }
    return true;
  }),
};

export const createEnquirySchema = object({
  ...payload,
});

export const deleteEnquirySchema = object({
  params: object({
    enquiryId: string(),
  }),
});

export const getDealEnquirySchema = object({
  params: object({
    dealId: string(),
  }),
});

export const getPackageEnquirySchema = object({
  params: object({
    packageId: string(),
  }),
});

export const getServiceEnquirySchema = object({
  params: object({
    serviceId: string(),
  }),
});

export const getEnquiryInfoSchema = object({
  params: object({
    enquiryId: string(),
  }),
});

export const updateEnquirySchema = object({
  params: object({
    enquiryId: string(),
  }),
});

export type createEnquiryInput = TypeOf<typeof createEnquirySchema>;
export type ReadDealEnquiryInput = TypeOf<typeof getDealEnquirySchema>;
export type ReadServiceEnquiryInput = TypeOf<typeof getServiceEnquirySchema>;
export type ReadPackageEnquiryInput = TypeOf<typeof getPackageEnquirySchema>;
export type deleteEnquiryInput = TypeOf<typeof deleteEnquirySchema>;
export type getEnquiryInfoInput = TypeOf<typeof getEnquiryInfoSchema>;
export type updateEnquiryInput = TypeOf<typeof updateEnquirySchema>;
