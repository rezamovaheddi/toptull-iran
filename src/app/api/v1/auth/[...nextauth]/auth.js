import Credentials from "next-auth/providers/credentials";
import { users } from "../../../../../lib/users";

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
};
