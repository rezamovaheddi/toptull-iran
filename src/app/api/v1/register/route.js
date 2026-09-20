import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, password, username } = body;
    
    if (!fullName || !email || !password || !username) {
      return NextResponse.json(
        {
          message: "همه فیلد ها الزامی هستند",
        },
        {
          status: 400,
        },
      );
    }

    const exiteUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (exiteUser) {
      return NextResponse.json(
        {
          message: "این ایمیل یا نام کاربری قبلا وجود دارد",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json(
      {
        message: "ثبت نام موقق امیز بود",
        user: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.fullName,
          email: newUser.email,
        },
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "خطایی رخ داد",
        error: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
