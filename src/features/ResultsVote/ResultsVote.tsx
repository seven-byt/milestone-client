import { useState } from "react";
import { IVoteState } from "../../store/voteSlice";

import styles from "./index.module.scss";

import { percentVotes } from "../../helpers/percentVotes";
import { Scale } from "../../shared";
import cn from "classnames";

interface IResultsVote {
  activeVote: IVoteState;
}

export const ResultsVote = ({ activeVote }: IResultsVote) => {
  const [videoReady, setVideoReady] = useState<boolean>(false);

  return (
    <div className={styles.results}>
      <div
        className={cn(styles.results__bgImage, {
          [styles.results__bgImage_ivan]: activeVote.id === 1,
          [styles.results__bgImage_vlada]: activeVote.id === 2,
          [styles.results__bgImage_pair]: activeVote.id === 3,
          [styles.results__bgImage_ruza]: activeVote.id === 4,
        })}
      >
        <video
          onCanPlay={() => setVideoReady(true)}
          playsInline
          loop
          muted
          autoPlay
        >
          <source
            src={
              activeVote.id === 1
                ? "https://github.com/seven-byt/milestone-client/blob/main/src/assets/videos/ivan.mp4?raw=true"
                : activeVote.id === 2
                ? "https://github.com/seven-byt/milestone-client/blob/main/src/assets/videos/vlada.mp4?raw=true"
                : activeVote.id === 3
                ? "https://github.com/seven-byt/milestone-client/blob/main/src/assets/videos/pair.mp4?raw=true"
                : "https://github.com/seven-byt/milestone-client/blob/main/src/assets/videos/ruza.mp4?raw=true"
            }
            type="video/mp4"
          />
        </video>
      </div>

      {videoReady && (
        <div className={styles.results__scales}>
          <Scale
            id={activeVote.id}
            className={styles.results__scaleItem}
            text={activeVote.options[0].text}
            percent={
              percentVotes(
                activeVote.options[0].votes,
                activeVote.options[1].votes
              ) >= 100
                ? 100
                : percentVotes(
                    activeVote.options[0].votes,
                    activeVote.options[1].votes
                  )
            }
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
                ) >=
              100
                ? 100
                : 100 -
                  percentVotes(
                    activeVote.options[0].votes,
                    activeVote.options[1].votes
                  )
            }
          />
        </div>
      )}
    </div>
  );
};
