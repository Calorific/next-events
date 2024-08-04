import type { AppProps } from 'next/app'
import { trpc } from '@/shared/api'
import { getSession, SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import { MainLayout } from '@/app/layouts/mainLayout';
import { ReactNode } from 'react';

type Props = AppProps & {
  Component: { getLayout?: (page: ReactNode) => ReactNode }
}

function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
  ));


  return <div className='mx-auto max-w-4xl'>
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
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