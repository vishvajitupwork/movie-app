import { z } from "zod";
export const movieValidator = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  publishYear: z.number().int().min(1800).max(new Date().getFullYear()),
  posterUrl: z.string().min(1, {
    message: "Poster is required.",
  }),
});

export type MoviePayload = z.infer<typeof movieValidator>;
