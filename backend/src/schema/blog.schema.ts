import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    author: string({
      required_error: "Author is required",
    }),

    title: string({
      required_error: "Title is required",
    }),

    content: string({
      required_error: "Content is required",
    }),

    category: string({
      required_error: "Category Id is required",
    }),
    authorImage:any({required_error: "Author image is required",}),
    contentImage: any(),
  }),
};

const params = {
  params: object({
    blogId: string({
      required_error: "blogId is required",
    }),
  }),
};

export const createBlogSchema = object({
  ...payload,
});

export const updateBlogSchema = object({
  ...payload,
  ...params,
});

export const deleteBlogSchema = object({
  ...params,
});

export const getBlogSchema = object({
  ...params,
});

export const getBlogFromCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
});

export type CreateBlogInput = TypeOf<typeof createBlogSchema>;
export type UpdateBlogInput = TypeOf<typeof updateBlogSchema>;
export type ReadBlogInput = TypeOf<typeof getBlogSchema>;
export type DeleteBlogInput = TypeOf<typeof deleteBlogSchema>;
export type GetBlogFromCategoryInput = TypeOf<
  typeof getBlogFromCategorySchema
>;
