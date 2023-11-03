import cn from "classnames";

import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useWebSocketContext } from "../../contexts";
import { useEffect, useMemo } from "react";
import { IVoteState, updateVotes } from "../../store/voteSlice";

const ResultsPage = () => {
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

  const activeVote: IVoteState | undefined = useMemo(() => {
    return votes.find((el) => !!el.enabled);
  }, [votes]);

  return (
    <section className={cn("screen", styles.results)}>
      {!activeVote ? (
        <div className={styles.results}>
          <h1 className={styles.results__empty}>
            Скоро начнется голосование...
          </h1>
        </div>
      ) : !activeVote.results ? (
        <p>Пожалуйста, отсканируйте QR-код под номером {activeVote.id}</p>
      ) : (
        <p>Вывод результатов</p>
      )}
    </section>
  );
};

export default ResultsPage;
