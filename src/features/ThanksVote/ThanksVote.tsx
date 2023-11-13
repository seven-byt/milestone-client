import cn from "classnames";

import { IVoteState } from "../../store/voteSlice";

// import ivan1 from "../../assets/thx/ivan1.png";
// import ivan2 from "../../assets/thx/ivan2.png";

import styles from "./index.module.scss";

interface IThanksVote {
  activeVote: IVoteState;
}

export const ThanksVote = ({ activeVote }: IThanksVote) => {
  return (
    <div className={cn(styles.results)}>
      <span
        className={cn(styles.ellipse1, {
          [styles.ellipse1_ivan]: activeVote.id === 1,
          [styles.ellipse1_vlada]: activeVote.id === 2,
          [styles.ellipse1_pair]: activeVote.id === 3,
          [styles.ellipse1_ruza]: activeVote.id === 4,
        })}
      ></span>
      <span
        className={cn(styles.ellipse2, {
          [styles.ellipse2_ivan]: activeVote.id === 1,
          [styles.ellipse2_vlada]: activeVote.id === 2,
          [styles.ellipse2_pair]: activeVote.id === 3,
          [styles.ellipse2_ruza]: activeVote.id === 4,
        })}
      ></span>

      {/* {activeVote.id === 1 && (
        <>
          <div className={styles.ivan__image1}>
            <img src={ivan1}></img>
          </div>
          <div className={styles.ivan__image2}>
            <img src={ivan2}></img>
          </div>
        </>
      )} */}

      <div className={styles.text}>
        <p>
          Спасибо, ваш
          <br />
          голос учтён!
        </p>
      </div>
      <div className={styles.textSec}>
        <p>
          Через несколько минут здесь
          <br />
          будут результаты.
        </p>
      </div>

      {/* <button
        className={styles.btnRefresh}
        onClick={() => {
          storage("token", null);
          window.location.reload();
        }}
      >
        Обнулить
      </button> */}
    </div>
  );
};
