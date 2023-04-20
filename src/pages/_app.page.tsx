import { type ReactElement, type ReactNode, useState } from 'react';
import { type NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domMax, LazyMotion } from 'framer-motion';

import GlobalStyles from '~/styles/GlobalStyle';
import theme from '~/styles/theme';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <LazyMotion features={domMax}>
            <GlobalStyles />
            {getLayout(<Component {...pageProps} />)}
          </LazyMotion>
        </ThemeProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}