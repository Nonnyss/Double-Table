import NextAuth from "next-auth";
import nextAuthOptions from "@/lib/authOption";
export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthOptions);


