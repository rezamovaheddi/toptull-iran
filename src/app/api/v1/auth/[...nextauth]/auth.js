import NextAuth from "next-auth";
import { users } from "../../../../../lib/users";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        username: {},
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const username = credentials.username;

        const user = users.find(
          (user) =>
            user.email === email &&
            user.password === password &&
            user.username === username,
        );
        if (!user) return null;
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
});
