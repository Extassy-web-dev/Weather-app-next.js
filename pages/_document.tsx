import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Weather App</title>
      </Head>
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
