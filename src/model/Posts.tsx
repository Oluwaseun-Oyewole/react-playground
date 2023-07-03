import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostUpdateModel = z.object({
  title: z
    .string({
      required_error: "Username is required!!!",
      invalid_type_error: "Username must be a string",
    })
    .min(5, { message: "Title must be at least 5 characters..." }),

  body: z.string().min(30, { message: "body must be at least 30 characters" }),
});

export type PostUpdateModelType = z.infer<typeof PostUpdateModel>;

export const CommentCreateModel = z.object({
  description: z
    .string()
    .min(30, { message: "body must be at least 30 characters" }),
});
export type CommentCreateModelType = z.infer<typeof CommentCreateModel>;
