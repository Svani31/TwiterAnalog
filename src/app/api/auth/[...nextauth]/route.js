import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "/src/app/utils/prismadb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        // email: { label: "Username", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await prisma.user.findFirst({
          where: {
            name: credentials.name,
            // email: credentials.email,
            password: credentials.password,
          },
        });
        if(!res){
          return null
        } 
        return res
       
      },
    }),
  ],
  callbacks: {
    async session({ session, token}) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      return token
    }
  },
 
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:process.env.NEXT_PUBLIC_API_KEY
  }
});

export { handler as GET, handler as POST };
