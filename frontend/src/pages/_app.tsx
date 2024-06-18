import ResponsiveAppBar from "@/components/NavBar";
import { ConnectionService } from "@/services/connectionService";
import { AppStore, makeStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }: AppProps) {

  const storeRef = useRef<AppStore>()
  if(!storeRef.current){
    storeRef.current = makeStore()
  }

  const connectionServiceRef = useRef<ConnectionService>()
  if(!connectionServiceRef.current){
    connectionServiceRef.current = new ConnectionService(storeRef.current)
  }

  return <>
    <Provider store={storeRef.current}>
      <div className="mb-10"><ResponsiveAppBar/></div>
      <Component {...pageProps} />
    </Provider>

  </>
  
}
