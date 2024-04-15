import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),

    email: string({
      required_error: "Email is required",
    }),

    subject: string({
      required_error: "Subject is required",
    }),

    message: string({
      required_error: "Message is required",
    }),
  }),
};

export const createContactSchema = object({
  ...payload,
});

export const deleteContactSchema = object({
  params: object({
    contactId: string(),
  }),
});

export const getContactSchema = object({
  params: object({
    contactId: string(),
  }),
});

export type createContactInput = TypeOf<typeof createContactSchema>;
export type deleteContactInput = TypeOf<typeof deleteContactSchema>;
export type getContactInput = TypeOf<typeof getContactSchema>;

