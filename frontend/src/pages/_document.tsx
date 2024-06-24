import { Html, Head, Main, NextScript } from "next/document";
import { ToastContainer, toast } from "react-toastify";

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <title>Cloud 9</title>
        <link rel="icon" href="/cloudicon.jpg" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
