import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Keycloak from "next-auth/providers/keycloak";
import GitHub from "next-auth/providers/github";
import pool from "./lib/db";

// import { PrismaClient } from "@prisma/client"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import SendGrid from "next-auth/providers/sendgrid"
// import Resend from "next-auth/providers/resend"
// import Email from "next-auth/providers/email"

// globalThis.prisma ??= new PrismaClient()

// authConfig.providers.push(
//   // Start server with `pnpm email`
//   Email({ server: "smtp://127.0.0.1:1025?tls.rejectUnauthorized=false" }),
//   SendGrid,
//   Resend
// )

// export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth(
//   (request) => {
//     if (request?.nextUrl.searchParams.get("test")) {
//       return {
//         // adapter: PrismaAdapter(globalThis.prisma),
//         session: { strategy: "jwt" },
//         ...authConfig,
//         providers: [],
//       }
//     }
//     return {
//       // adapter: PrismaAdapter(globalThis.prisma),
//       session: { strategy: "jwt" },
//       ...authConfig,
//     }
//   }
// )

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, `auth` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
    } & User;
  }

  interface User {
    foo?: string;
  }
}

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(c) {
        const { rows, rowCount } = await pool.query(
          "SELECT * FROM users WHERE name=$1",
          [c.name]
        );

        if (!rowCount) return null;

        if (c.password !== rows[0].password) return null;

        return {
          id: rows[0].id,
          name: rows[0].name,
          role: rows[0].role,
        };
      },
    }),
    GitHub,
    Keycloak,
  ],

  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
  basePath: "/auth",
  session: { strategy: "jwt" },
});
