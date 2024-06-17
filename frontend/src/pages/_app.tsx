import ResponsiveAppBar from "@/components/NavBar";
import { AppStore, makeStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }: AppProps) {

  const storeRef = useRef<AppStore>()
  if(!storeRef.current){
    console.log('passou aqui')
    storeRef.current = makeStore()
  }

  return <>
    <Provider store={storeRef.current}>
      <div className="mb-10"><ResponsiveAppBar/></div>
      <Component {...pageProps} />
    </Provider>

  </>
  
}
