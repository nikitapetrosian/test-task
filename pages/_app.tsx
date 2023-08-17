import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { StateProvider } from "../contexts/stateContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <main>
        <StateProvider>
          <div className="wrapper">
            <Component {...pageProps} />
          </div>
        </StateProvider>
      </main>
    </Layout>
  );
}

export default MyApp;
