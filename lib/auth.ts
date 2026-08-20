import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

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

        const targetRole = ADMIN_EMAILS.includes(credentials.email.toLowerCase()) ? "admin" : "customer";

        let user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name ?? "Client",
              role: targetRole,
            },
          });
        } else if (targetRole === "admin" && user.role !== "admin") {
          user = await prisma.user.update({ where: { id: user.id }, data: { role: "admin" } });
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
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "memel-secret",
};
