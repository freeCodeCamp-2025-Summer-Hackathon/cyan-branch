import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [

  ],
  session: {
    strategy: 'jwt'
  }
}
export const getAuth = () => getServerSession(authOptions);