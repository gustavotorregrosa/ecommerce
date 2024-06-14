import ResponsiveAppBar from "@/components/NavBar";
import { AuthProvider } from "@/providers/authProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return <>
    <AuthProvider>
      <div className="mb-10"><ResponsiveAppBar/></div>
      <Component {...pageProps} />
    </AuthProvider>
  </>
  
}
