import nextAuthOptions from "@/lib/authOption";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
