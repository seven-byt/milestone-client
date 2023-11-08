import { IVoteState } from "../../store/voteSlice";

import styles from "./index.module.scss";

import { percentVotes } from "../../helpers/percentVotes";
import { Scale } from "../../shared";

import ivan from "../../assets/videos/ivan.mp4";
import ruza from "../../assets/videos/ruza.mp4";
import pair from "../../assets/videos/pair.mp4";
import vlada from "../../assets/videos/vlada.mp4";
import { useRef } from "react";
import ReactPlayer from "react-player";

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
  const videoRef = useRef<ReactPlayer>(null);
  // const [loadedSeconds, setLoadedSeconds] = useState<number>(0);
  // const [playedSeconds, setPlayedSeconds] = useState<number>(0);

  const settings = {
    className: styles.video__player,
    width: "100%",
    height: "100%",
    progressInterval: 100,
    loop: true,
    controls: false,
    playsinline: true,
    stopOnUnmount: true,
    volume: 1,
    ref: videoRef,
  };

  // const videoReady = () => {
  //   if (loadedSeconds === 0) {
  //     // @ts-ignore
  //     setLoadedSeconds(innerRef.current.getDuration() * 1000);
  //   }
  // };

  // const handleProgress = (obj: any) => {
  //   setPlayedSeconds(obj.playedSeconds * 1000);
  // };

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
          // onProgress={handleProgress}
          // onReady={videoReady}
          url={
            activeVote.id === 1
              ? ivan
              : activeVote.id === 2
              ? vlada
              : activeVote.id === 3
              ? pair
              : ruza
          }
          playing={true}
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
