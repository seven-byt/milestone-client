import cn from "classnames";

import styles from "./index.module.scss";
import { VoteControl } from "../../features";
import { useWebSocketContext } from "../../contexts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { IVoteState, updateVotes } from "../../store/voteSlice";
import { Button } from "../../shared";
import { INITIAL_VOTES } from "../constants";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { socket } = useWebSocketContext();
  const { votes } = useAppSelector((store) => store.votesSlice);

  useEffect(() => {
    if (!socket) return;
    socket.emit("askForStateUpdate");

    socket.on("updateState", (votes: IVoteState[]) => {
      console.log(votes);
      dispatch(updateVotes(votes));
    });
  }, [socket]);

  const handleCompleteVote = (voteId: number) => {
    if (!socket) return;
    socket.emit("completeVote", voteId);
  };
  const handleResultsVote = (voteId: number) => {
    if (!socket) return;
    socket.emit("resultsVote", voteId);
  };
  const handleEnableVote = (voteId: number) => {
    if (!socket) return;
    socket.emit("enableVote", voteId);
  };
  const handleInitialVotes = (votes: IVoteState[]) => {
    if (!socket) return;
    socket.emit("initialVotes", votes);
  };

  return (
    <section className={cn("screen", styles.admin)}>
      <div className={styles.admin__grid}>
        {votes.map((item) => (
          <VoteControl
            key={item.id}
            title={
              item.id === 1
                ? "Иван"
                : item.id === 2
                ? "Влада"
                : item.id === 3
                ? "Пара"
                : "Рузанна"
            }
            id={item.id}
            vote={item}
            handleCompleteVote={handleCompleteVote}
            handleResultsVote={handleResultsVote}
            handleEnableVote={handleEnableVote}
          />
        ))}
      </div>

      <Button
        cn={styles.admin__btn}
        text={"Обнулить голосования"}
        onClick={() => handleInitialVotes(INITIAL_VOTES)}
      />
    </section>
  );
};

export default AdminPage;
