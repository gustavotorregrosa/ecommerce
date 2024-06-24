import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface ISocketsGroup {
    category: Socket
}

export const SocketsContext = createContext<ISocketsGroup | null>(null)

