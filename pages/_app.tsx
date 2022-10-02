import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SearchProvider } from '../context/SearchContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SearchProvider>
    <Component {...pageProps} />
  </SearchProvider>
);

export default MyApp;
