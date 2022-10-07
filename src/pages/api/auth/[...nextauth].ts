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
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );
        return session;
      } catch {
        return session;
      }
    },
  },
});
