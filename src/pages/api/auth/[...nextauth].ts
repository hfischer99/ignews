import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  secret: process.env.SIGNING_KEY,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const { email } = session.user;
      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        return session;
      } catch {
        return session;
      }
    },
  },
});
