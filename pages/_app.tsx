import './globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { getSession, SessionProvider, useSession } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { fetcher } from '#/utils/api'

function MySWR({ children, fallback }: React.PropsWithChildren<{ fallback?: Record<string, any> }>) {
  const { data: session } = useSession()
  let { token } = session ?? {}

  return (
    <SWRConfig
      value={{
        fallback,
        fetcher: async (resource, init) => {
          if (!token) {
            token = (await getSession())?.token
          }
          return fetcher(resource, init, token)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default function MyApp({ Component, session, pageProps }: AppProps & { session: any }) {
  return (
    <SessionProvider session={session}>
      <MySWR fallback={pageProps.fallback}>
        <Component {...pageProps} />
      </MySWR>
    </SessionProvider>
  )
}
