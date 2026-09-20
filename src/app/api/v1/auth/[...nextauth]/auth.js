import Credentials from "next-auth/providers/credentials";
import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, username } = credentials;

        // You might want to allow login by either email or username
        // Here we require both email and username if they are both provided by the form, 
        // or you can adjust to find by email OR username based on your UI.
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email },
              { username: username },
            ]
          }
        });
        
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
