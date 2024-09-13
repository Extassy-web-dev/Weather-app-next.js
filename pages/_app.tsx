import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MyProvider } from '../contexts/Context';
import { Overpass } from "next/font/google"

const inter = Overpass({ subsets: ['latin'], weight: "400" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <MyProvider>
        <Component {...pageProps} />;
      </MyProvider>
    </main>

  )
}
