import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name must contain at least 4 characters."),

    email: z
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters."),
    //confirmPassword: z.string(),
  })
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords do not match.",
// }); //TODO match passowrds maybe?

export type RegisterSchema = z.infer<typeof registerSchema>;