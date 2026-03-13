import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/templates/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Front Bancoudea</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;