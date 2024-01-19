import { z } from "zod";
export const loginValidator = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email(),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .refine(
      (password) => {
        return password?.length >= 4;
      },
      {
        message: "Your password must be at least 5 characters long.",
      }
    ),
  remember_me: z.boolean().optional(),
});
