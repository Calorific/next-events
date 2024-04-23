import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { trpc } from '@/shared/api'
import { getSession, SessionProvider } from 'next-auth/react'

function App({ Component, pageProps }: AppProps) {
  return <div className='mx-auto max-w-4xl'>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </div>
}

App.getInitialProps = async ({ ctx }: any) => {
  const session = await getSession(ctx)
  return {
    pageProps: {
      session
    }
  }
}

export default trpc.withTRPC(App)