import type { NextAuthConfig, User } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: {
      label: "User Name",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    console.log("CREDENTIALS ARE HARDCODED :(")

    // if (credentials.username && credentials.password)
    try {
      const response = await fetch(`https://caba-api-staging.herokuapp.com/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation Login($loginUser: LoginUserInput!){
            login(loginUser: $loginUser){
              roles {
                createdAt
                id
                role
                updatedAt
              }
              accessToken
            }
          }`,
          variables: {
            loginUser: {
              email: 'shah.zaib@kwanso.com',
              password: '1234'
            }
          },
        }),
      });

      const result = await response.json(); // Await the result here
      console.log("response", result);
      return result;

    } catch (error) {
      console.error("errorInVain", error);
    }
    // return {
    //   name: "Vahid",
    // };
    // else return null;
  },
});

const config = {
  providers: [credentialsConfig], //[Google, credentialsConfig],
  // session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middlewareProtected") return !!auth;
      return true;
    },

    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token, user }) {
      const x = token;
      x.id = 'klo';
      x.emailVerified = true;
      session.user = x as unknown as User & AdapterUser;
      return session
    }

  },
  secret: "Yo/0duPLAErkzTcBlgWGWR4eaVyivqU6a+M/ot0fo9c=",
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
