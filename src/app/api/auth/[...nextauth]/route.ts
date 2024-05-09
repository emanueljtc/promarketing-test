import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFound) throw new Error('No user found');

        const password = credentials?.password ?? '';
        const matchPassword = await bcrypt.compare(
          password,
          userFound.password
        );

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

