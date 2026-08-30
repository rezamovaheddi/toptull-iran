import { NextResponse } from "next/server";
import { users } from "../../../../lib/users";

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
    const exiteUser = users.find((user) => user.email === email);

    if (exiteUser) {
      return NextResponse.json(
        {
          message: "این ایمیل قبلا وجود دارد",
        },
        {
          status: 409,
        },
      );
    }

    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      username,
      email,
      password,
    };

    users.push(newUser);

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
        error: err,
      },
      {
        status: 500,
      },
    );
  }
}
