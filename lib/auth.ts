import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Nom", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name ?? "Client",
            },
          });
        }

        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/mon-compte",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "memel-secret",
};
