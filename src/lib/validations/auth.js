import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "ایمیل یا نام کاربری الزامی است" }),
  password: z
    .string()
    .min(1, { message: "رمز عبور الزامی است" })
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
  rememberMe: z.boolean().optional().default(false),
});
