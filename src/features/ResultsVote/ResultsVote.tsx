import { IVoteState } from "../../store/voteSlice";

import styles from "./index.module.scss";

import { percentVotes } from "../../helpers/percentVotes";
import { Scale } from "../../shared";

import ivan from "../../assets/videos/ivan.mp4";
import ruza from "../../assets/videos/ruza.mp4";
import pair from "../../assets/videos/pair.mp4";
import vlada from "../../assets/videos/vlada.mp4";

interface IResultsVote {
  activeVote: IVoteState;
  // ivan: string;
  // vlada: string;
  // pair: string;
  // ruza: string;
}

//TODO: подставить актуальные значение голосов
export const ResultsVote = ({
  activeVote,
}: // ivan,
// vlada,
// pair,
// ruza,
IResultsVote) => {
  return (
    <div className={styles.results}>
      <div className={styles.results__bgImage}>
        <video
          src={
            activeVote.id === 1
              ? ivan
              : activeVote.id === 2
              ? vlada
              : activeVote.id === 3
              ? pair
              : ruza
          }
          loop
          playsInline
          autoPlay
          muted
          x5-playsinline
        ></video>
      </div>

      <div className={styles.results__scales}>
        <Scale
          id={activeVote.id}
          className={styles.results__scaleItem}
          text={activeVote.options[0].text}
          percent={percentVotes(
            activeVote.options[0].votes,
            activeVote.options[1].votes
          )}
        />
        <Scale
          id={activeVote.id}
          className={styles.results__scaleItem}
          text={activeVote.options[1].text}
          percent={
            100 -
            percentVotes(
              activeVote.options[0].votes,
              activeVote.options[1].votes
            )
          }
        />
      </div>
    </div>
  );
};
