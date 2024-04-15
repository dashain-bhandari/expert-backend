import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),

    username: string({
      required_error: "username is required",
    }),

    email: string({
      required_error: "email is required",
    }),

    password: string({
      required_error: "password is required",
    }),

    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),

    verifyToken: string().optional().default(""),

    role: string().default("user"),

    // isPrivacyPloicyChecked: boolean()
    //   .default(false)
    //   .refine((value) => value === true, {
    //     message: "Privacy policy must be accepted",
    //     path: ["isPrivacyPloicyChecked"],
    //   }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...payload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;

//  User login
const loginPayload = {
  body: object({
    email: string({
      required_error: "email is required",
    }),

    password: string({
      required_error: "password is required",
    }),
  }),
};

export const loginUserSchema = object({
  ...loginPayload,
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
