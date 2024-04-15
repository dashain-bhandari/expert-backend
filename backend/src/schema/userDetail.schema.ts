import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    profileImage: string().default(""),
    backgroundImage: string().default(""),

    phone1: string().default(""),
    phone2: string().default(""),
    phone3: string().default(""),

    quote: string().default(""),
    education: string().default(""),
    address: string().default(""),

    email1: string().default(""),
    email2: string().default(""),

    businessLink1: string().default(""),
    businessLink2: string().default(""),
    businessLink3: string().default(""),
    businessLink4: string().default(""),

    whatsapp: string().default(""),
    viber: string().default(""),

    facebook: string().default(""),
    instagram: string().default(""),
    x: string().default(""),
    youtube: string().default(""),
    linkedin: string().default(""),

    organizationImage: string().default(""),
    organizationName: string().default(""),
    position: string().default(""),

    user: string(),
  }),
};

const params = {
  params: object({
    userDetailId: string({
      required_error: "userDetailId is required",
    }),
  }),
};

export const createUserDetailSchema = object({
  ...payload,
});

export const updateUserDetailSchema = object({
  ...payload,
  ...params,
});

export const deleteUserDetailSchema = object({
  ...params,
});

export const getUserDetailSchema = object({
  ...params,
});

export type CreateUserDetailInput = TypeOf<typeof createUserDetailSchema>;
export type UpdateUserDetailInput = TypeOf<typeof updateUserDetailSchema>;
export type ReadUserDetailInput = TypeOf<typeof getUserDetailSchema>;
export type DeleteUserDetailInput = TypeOf<typeof deleteUserDetailSchema>;

const getUserDetailByUserIdParams = {
  params: object({
    userId: string({
      required_error: "UserId is required",
    }),
  }),
};

export const getUserDetailByUserIdSchema = object({
  ...getUserDetailByUserIdParams,
});

export type ReadUserDetailByUserIdInput = TypeOf<typeof getUserDetailByUserIdSchema>;
