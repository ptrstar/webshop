import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Load admin credentials from environment variables
        console.log()
        const adminUser = {
          id: "1",
          name: "admin",
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        };
        if (
          credentials?.username === adminUser.username &&
          credentials?.password === adminUser.password
        ) {
          return { id: adminUser.id, name: adminUser.name };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/auth", // Custom sign-in page
  },
};
