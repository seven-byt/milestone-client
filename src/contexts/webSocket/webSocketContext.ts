import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { IVoteState } from "../../store/voteSlice";

export type PollState = {
  question: string;
  options: {
    id: number;
    text: string;
    description: string;
    votes: string[];
  }[];
};

interface IWebSocketContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
}

export interface ServerToClientEvents {
  updateState: (state: IVoteState[]) => void;
}
export interface ClientToServerEvents {
  vote: (voteId: number, optionId: number) => void;
  askForStateUpdate: () => void;
  completeVote: (voteId: number) => void;
  enableVote: (voteId: number) => void;
  resultsVote: (voteId: number) => void;
  initialVotes: (votes: IVoteState[]) => void;
}

export const WebSocketContext = createContext<IWebSocketContext>({
  socket: null,
  isConnected: false,
});

export const useWebSocketContext = () => useContext(WebSocketContext);
