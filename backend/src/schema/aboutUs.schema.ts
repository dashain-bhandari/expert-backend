import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    vision: string({
      required_error: "Vision is required",
    }),

    mission: string({
      required_error: "Mission is required",
    }),

    story: string({
      required_error: "Story is required",
    }),
    visionImage: any(),
    missionImage: any(),
    storyImage: any(),
  }),
};

export const createAboutUsSchema = object({
  ...payload,
});

export const deleteAboutUsSchema = object({
  params: object({
    aboutUsId: string(),
  }),
});

export const getAboutUsSchema = object({
  params: object({
    aboutUsId: string(),
  }),
});

export type createAboutUsInput = TypeOf<typeof createAboutUsSchema>;
export type deleteAboutUsInput = TypeOf<typeof deleteAboutUsSchema>;
export type getAboutUsInput = TypeOf<typeof getAboutUsSchema>;
