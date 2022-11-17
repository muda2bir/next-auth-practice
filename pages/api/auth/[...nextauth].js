import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDataBase from "../../../database/conn";
import User from "../../../models/userSchema";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectToDataBase();

        // Check if the user exists
        let result = await User.findOne({ email: credentials.email });
        if (!result) throw new Error("No User not Found!");

        let checkPassword = await bcrypt.compare(
          credentials.password,
          result.password
        );
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Invalid Credentials");
        }

        return result;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
