import ResponsiveAppBar from "@/components/NavBar";
import { ConnectionServiceContext } from "@/context/ConnectionContext";
import { ConnectionService } from "@/services/connectionService";
import { AppStore, makeStore } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { Provider } from 'react-redux'
import 'material-react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import io, { Socket } from 'socket.io-client'
import { SocketsContext } from "@/context/SocketsContext";
import {AlertModal} from '@/components/SendAlertModal'

export default function App({ Component, pageProps }: AppProps) {

  const storeRef = useRef<AppStore>()
  if(!storeRef.current){
    storeRef.current = makeStore()
  }

  const connectionServiceRef = useRef<ConnectionService>()
  if(!connectionServiceRef.current){
    connectionServiceRef.current = new ConnectionService(storeRef.current)
  }

  const categorySocket = useRef<Socket>()
  if(!categorySocket.current){
    categorySocket.current = io(process.env.NEXT_PUBLIC_API_URL + 'category', {autoConnect: true, reconnection: false})
  }

  const productSocket = useRef<Socket>()
  if(!productSocket.current){
    productSocket.current = io(process.env.NEXT_PUBLIC_API_URL + 'product', {autoConnect: true, reconnection: false})
  }

  const messageSocket = useRef<Socket>()
  if(!messageSocket.current){
    messageSocket.current = io(process.env.NEXT_PUBLIC_API_URL + 'message', {autoConnect: true, reconnection: false})
  }

  const sockets = {
    category: categorySocket.current,
    product: productSocket.current,
    message: messageSocket.current
  }

  let openSendMessageModal: () => void

  return <>
    <Provider store={storeRef.current}>
      <SocketsContext.Provider value={sockets}>
        <ConnectionServiceContext.Provider value={connectionServiceRef.current}>
          <div className="mb-10"><ResponsiveAppBar openSendMessageModal={() => openSendMessageModal()} /></div>
            <Component {...pageProps} />
          <ToastContainer />
          <AlertModal setOpenFn={fn => openSendMessageModal = fn} />
        </ConnectionServiceContext.Provider>
      </SocketsContext.Provider>
    </Provider>
  </>
}
