import { object, number, string, TypeOf, any, boolean } from "zod";

const payload = {
  body: object({
    recieverMail: string({
      required_error: "Reciever's mail is required",
    }),

    body: string({
      required_error: "Body is required",
    }),

    subject: string({
      required_error: "Subject is required",
    }),

    sender: string({
      required_error: "Sender is required",
    }),

    documents: any(),

  }),
};

export const createEmailSchema = object({
  ...payload,
});

export const deleteEmailSchema = object({
  params: object({
    emailId: string(),
  }),
});

export const getEmailSchema = object({
  params: object({
    emailId: string(),
  }),
});

export const updateEmailSchema=object({
  params:object({
    emailId:string()
  })
})

export type createEmailInput = TypeOf<typeof createEmailSchema>;
export type ReadEmailInput = TypeOf<typeof getEmailSchema>;
export type deleteEmailInput = TypeOf<typeof deleteEmailSchema>;
export type updateEmailInput=TypeOf<typeof updateEmailSchema>;