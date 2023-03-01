import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    id: string
    token: string
  }

  interface User {
    id: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    token: string
  }
}
