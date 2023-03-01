import { fetcher } from '#/utils/api'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  theme: {
    colorScheme: 'light',
    brandColor: '#00add8',
    logo: '/vercel.svg',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.token) {
        token.token = user.token
      }
      return token
    },
    session: ({ session, token }) => {
      session.token = token.token
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'johndoe@example.com' },
      },
      async authorize(credentials, _) {
        if (credentials === undefined) return null
        const user = await fetcher(`/api/start`, {
          method: 'POST',
          body: JSON.stringify({ email: credentials.email }),
        })
        if (user.errors) {
          throw new Error(JSON.stringify(user))
        } else {
          return user
        }
      },
    }),
  ],
}

export default NextAuth(authOptions)
