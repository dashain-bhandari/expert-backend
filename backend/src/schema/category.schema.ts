import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    category: string({
      required_error: "Category Name is required",
    }),
    categoryImage: string({
        required_error: "Category Image is required",
      }),
      type: string({
        required_error: "Category type is required",
      }),
   
  })
    
};

const params = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

export const getCategoryInfoSchema=object({
  body:object({
    category: string(),
    company:string(),
  })
})

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type GetCategoryInfoInput=TypeOf<typeof getCategoryInfoSchema>;