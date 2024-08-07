import { Provider } from "react-redux";
import "/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store/store";
import ThemeContextProvider from "../context/ThemeContext";
import Head from "next/head";
import RootLayout from "../layouts/RootLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeContextProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ThemeContextProvider>
      </Provider>
    </>
  );
}
