import { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { useWebSocketContext } from "../../contexts";
import { IVoteState, updateVotes } from "../../store/voteSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

import styles from "./index.module.scss";

import { storage } from "../../helpers/storage";
import { ILocalToken } from "../../app/providers/withWebSocket";
import { ActiveVote, ThanksVote, Soon, ResultsVote } from "../../features";

import ivan from "../../assets/videos/ivan.mp4";
import ruza from "../../assets/videos/ruza.mp4";
import pair from "../../assets/videos/pair.mp4";
import vlada from "../../assets/videos/vlada.mp4";

const VotePage = () => {
  const dispatch = useAppDispatch();
  const { socket, isConnected } = useWebSocketContext();
  const { votes } = useAppSelector((store) => store.votesSlice);
  const [userLocal, setUserLocal] = useState<ILocalToken | null>(null);

  useEffect(() => {
    if (!isConnected) return;
    const user: ILocalToken | null = storage("token");
    setUserLocal(user);
  }, [isConnected]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("askForStateUpdate");

    socket.on("updateState", (votes: IVoteState[]) => {
      console.log(votes);
      dispatch(updateVotes(votes));
    });
  }, [socket]);

  // Клик на "Проголосовать"
  const handleVote = (voteId: number, selectedOption: number) => {
    if (!socket) return;

    const newUserLocal = () => {
      if (!userLocal) return null;
      const votes = userLocal.votes.map((vote) => {
        if (voteId === vote.id) {
          return { ...vote, voted: true };
        }
        return vote;
      });
      return { token: userLocal.token, votes };
    };

    setUserLocal(newUserLocal());

    storage("token", newUserLocal());
    socket.emit("vote", voteId, selectedOption);
  };

  // Активное голосование
  const activeVote: IVoteState | undefined = useMemo(() => {
    if (!votes) return;
    return votes.find((el) => el.enabled || el.results);
  }, [votes]);

  // Проголосовал ли
  const isVoted = useCallback(() => {
    if (!activeVote || !userLocal) return;

    const activeVoteLocal = userLocal.votes.find(
      (vote) => vote.id === activeVote.id
    );
    if (!activeVoteLocal) return;

    return activeVoteLocal.voted;
  }, [activeVote, userLocal]);

  // Проверка на запущеное голосование
  if (!activeVote) {
    return (
      <div className={cn("screen", styles.page)}>
        <Soon />
      </div>
    );
  }

  return (
    <div className={cn("screen", styles.page)}>
      <div className={styles.hidden}>
        <video src={ivan} loop playsInline x5-playsinline autoPlay></video>
        <video src={ruza} loop playsInline x5-playsinline autoPlay></video>
        <video src={vlada} loop playsInline x5-playsinline autoPlay></video>
        <video src={pair} loop playsInline x5-playsinline autoPlay></video>
      </div>
      {activeVote.enabled && !isVoted() && (
        <ActiveVote activeVote={activeVote} handleVote={handleVote} />
      )}
      {activeVote.enabled && isVoted() && (
        <ThanksVote activeVote={activeVote} />
      )}
      {activeVote.results && (
        <ResultsVote
          activeVote={activeVote}
          ivan={ivan}
          ruza={ruza}
          pair={pair}
          vlada={vlada}
        />
      )}
    </div>
  );
};

export default VotePage;
