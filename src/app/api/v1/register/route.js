import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { z } from "zod";

const registerBodySchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, { message: "نام کاربری باید حداقل ۳ کاراکتر باشد" })
            .max(30, { message: "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد" })
            .regex(/^[a-zA-Z0-9_]+$/, {
                message: "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و زیرخط باشد",
            })
            .optional()
            .nullable()
            .or(z.literal("")),
        password: z
            .string({ required_error: "رمز عبور الزامی است" })
            .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
        confirmPassword: z
            .string({ required_error: "تکرار رمز عبور الزامی است" })
            .min(1, { message: "تکرار رمز عبور الزامی است" }),
        fullName: z.string().optional().nullable(),
        email: z
            .string()
            .email({ message: "فرمت آدرس ایمیل نامعتبر است" })
            .optional()
            .nullable()
            .or(z.literal("")),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "رمز عبور و تکرار آن یکسان نیستند",
        path: ["confirmPassword"],
    });

export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({
                success: false,
                message: "داده‌های ارسالی نامعتبر است",
            }, { status: 400 });
        }

        // 1. Zod Validation
        const validationResult = registerBodySchema.safeParse(body);
        if (!validationResult.success) {
            const firstError =
                validationResult.error.errors[0]?.message || "اطلاعات وارد شده نامعتبر است";
            return NextResponse.json({
                success: false,
                message: firstError,
                errors: validationResult.error.flatten().fieldErrors,
            }, { status: 400 });
        }

        const { password } = validationResult.data;
        const rawFullName = body.fullName;
        const rawUsername = body.username;
        const rawEmail = body.email;

        // 2. Auto-generate missing fields
        // Username: user_${random 8-char hex} (unique)
        let finalUsername =
            typeof rawUsername === "string" && rawUsername.trim().length > 0 ?
            rawUsername.trim() :
            "";

        if (!finalUsername) {
            let isUnique = false;
            while (!isUnique) {
                const randomSuffix = crypto.randomBytes(4).toString("hex");
                const candidate = `user_${randomSuffix}`;
                const existing = await prisma.user.findUnique({
                    where: { username: candidate },
                });
                if (!existing) {
                    finalUsername = candidate;
                    isUnique = true;
                }
            }
        }

        // Email: ${username}@toptull.ir if not provided
        let finalEmail =
            typeof rawEmail === "string" && rawEmail.trim().length > 0 ?
            rawEmail.trim().toLowerCase() :
            "";

        if (!finalEmail) {
            finalEmail = `${finalUsername.toLowerCase()}@toptull.ir`;
        }

        // FullName: 'کاربر تاپ‌تول' if not provided
        let finalFullName =
            typeof rawFullName === "string" && rawFullName.trim().length > 0 ?
            rawFullName.trim() :
            `${finalUsername}`;

        // 3. Duplicate check in database
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: finalEmail }, { username: finalUsername }],
            },
        });

        if (existingUser) {
            const isUsernameConflict =
                existingUser.username.toLowerCase() === finalUsername.toLowerCase();
            return NextResponse.json({
                success: false,
                message: isUsernameConflict ?
                    "این نام کاربری قبلاً استفاده شده است. لطفاً نام کاربری دیگری انتخاب کنید" : "کاربری با این ایمیل قبلاً ثبت‌نام کرده است",
            }, { status: 409 });
        }

        // 4. Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create user in database via Prisma
        const newUser = await prisma.user.create({
            data: {
                fullName: finalFullName,
                username: finalUsername,
                email: finalEmail,
                password: hashedPassword,
            },
        });

        // 6. Generate JWT Token with 3-day validity
        const jwtSecret =
            process.env.JWT_SECRET ||
            process.env.NEXTAUTH_SECRET ||
            "toptull-jwt-secret-key-3days-validity";

        const token = jwt.sign({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            jwtSecret, { expiresIn: "3d" }
        );

        // 7. Response & HTTP-only cookie with 3-day expiration
        const response = NextResponse.json({
            success: true,
            message: "ثبت‌نام با موفقیت انجام شد",
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
            },
        }, { status: 201 });

        const THREE_DAYS_IN_SECONDS = 3 * 24 * 60 * 60; // 259,200 seconds

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: THREE_DAYS_IN_SECONDS,
            path: "/",
        });

        return response;
    } catch (err) {
        console.error("Registration error:", err);
        return NextResponse.json({
            success: false,
            message: "خطایی در پردازش ثبت‌نام رخ داد",
            error: process.env.NODE_ENV === "development" ? err.message : undefined,
        }, { status: 500 });
    }
}