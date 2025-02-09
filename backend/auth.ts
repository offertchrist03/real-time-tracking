import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const config = {
  runtime: "nodejs",
};

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface JWT {
    id: string;
    name: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
    };
  }
}

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: true,

  providers: [
    Credentials({
      credentials: {
        name: { label: "Nom", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.name || !credentials.password) return null;

        // Rechercher l'utilisateur dans la base de données
        const user = await prisma.users.findUnique({
          where: { name: String(credentials.name) },
        });

        if (!user || credentials.password !== user.password) return null;

        return { id: String(user.id), name: user.name, role: user.role };
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      return session;
    },
    async redirect() {
      // Redirect to a custom page after successful sign-in
      return "/"; // You can change this path
    },
  },

  session: { strategy: "jwt" },
  basePath: "/auth",
});
