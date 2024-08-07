import { Provider } from "react-redux";
import RootLayout from "./RootLayout";
import "/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../store/store";
import ThemeContextProvider from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeContextProvider>
    </Provider>
  );
}
