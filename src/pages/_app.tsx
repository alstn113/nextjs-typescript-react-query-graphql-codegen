import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';

import { GlobalStyle } from '@/styles/global-style';
import { theme } from '@/styles/theme';
import LayoutComponent from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
export default MyApp;
