import socketIOClient, { Socket } from "socket.io-client";
import { WebSocketContext } from "../../contexts";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../contexts/webSocket/WebSocketContext";
import { storage } from "../../helpers/storage";

interface IWithWebSocket {
  children: ReactNode;
}

interface IVoted {
  id: number;
  voted: boolean;
}

export interface ILocalToken {
  token: string;
  votes: IVoted[];
}

export const WithWebSocket = ({ children }: IWithWebSocket) => {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<ILocalToken | null>(null);

  useEffect(() => {
    const localToken: ILocalToken | null = storage("token");

    if (localToken) {
      setUser(localToken);
      return;
    }

    const randomToken = Math.random().toString(36).substring(7);
    const newUser = {
      token: randomToken,
      votes: [
        {
          id: 1,
          voted: false,
        },
        {
          id: 2,
          voted: false,
        },
        {
          id: 3,
          voted: false,
        },
        {
          id: 4,
          voted: false,
        },
      ],
    };
    setUser(newUser);
    storage("token", newUser);
  }, []);

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    useMemo(() => {
      if (!user) return null;
      return socketIOClient("http://localhost:8000", {
        auth: {
          token: user?.token,
        },
      });
    }, [user]);

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
