import { IVoteState } from "../../store/voteSlice";

import styles from "./index.module.scss";

import { percentVotes } from "../../helpers/percentVotes";
import { Scale } from "../../shared";

import ivan from "../../assets/ivan.mp4";
import ruza from "../../assets/ruza.mp4";
import pair from "../../assets/pair.mp4";
import vlada from "../../assets/vlada.mp4";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface IResultsVote {
  activeVote: IVoteState;
}

//TODO: подставить актуальные значение голосов
export const ResultsVote = ({ activeVote }: IResultsVote) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [videoReady, setVideoReady] = useState<boolean>(false);

  const settings = {
    className: styles.video__player,
    width: "100%",
    height: "100%",
    progressInterval: 100,
    loop: true,
    controls: false,
    playsinline: true,
    volume: 1,
    ref: videoRef,
  };

  const onVideoReady = () => {
    setVideoReady(true);
  };

  useEffect(() => {
    setPlaying(true);
  }, [videoReady]);

  return (
    <div className={styles.results}>
      <div className={styles.results__bgImage}>
        {/* <video ref={videoRef} playsInline loop muted>
          <source
            src={
              activeVote.id === 1
                ? ivan
                : activeVote.id === 2
                ? vlada
                : activeVote.id === 3
                ? pair
                : ruza
            }
            type="video/mp4"
          />
        </video> */}
        <ReactPlayer
          onReady={onVideoReady}
          url={
            activeVote.id === 1
              ? ivan
              : activeVote.id === 2
              ? vlada
              : activeVote.id === 3
              ? pair
              : ruza
          }
          playing={playing}
          muted={true}
          {...settings}
        />
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
