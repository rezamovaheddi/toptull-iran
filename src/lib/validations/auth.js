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

export const registerSchema = z
  .object({
    username: z
      .string({ required_error: "نام کاربری الزامی است" })
      .trim()
      .min(1, { message: "نام کاربری الزامی است" })
      .min(3, { message: "نام کاربری باید حداقل ۳ کاراکتر باشد" })
      .max(30, { message: "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و زیرخط باشد",
      }),
    password: z
      .string({ required_error: "رمز عبور الزامی است" })
      .min(1, { message: "رمز عبور الزامی است" })
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
    confirmPassword: z
      .string({ required_error: "تکرار رمز عبور الزامی است" })
      .min(1, { message: "تکرار رمز عبور الزامی است" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });
