import { useState } from "react";
import cn from "classnames";

import { IVoteState } from "../../store/voteSlice";
import { Button } from "../../shared";

import ruza from "../../assets/ruza.png";
import ivan from "../../assets/ivan.png";
import vlada from "../../assets/vlada.png";
import pair from "../../assets/pair.png";

import styles from "./index.module.scss";

interface IActiveVote {
  activeVote: IVoteState;
  handleVote: (voteId: number, selectedOption: number) => void;
}

export const ActiveVote = ({ activeVote, handleVote }: IActiveVote) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  return (
    <div
      className={cn(styles.vote, {
        [styles.vote_1]: activeVote.id === 1,
        [styles.vote_2]: activeVote.id === 2,
        [styles.vote_3]: activeVote.id === 3,
        [styles.vote_4]: activeVote.id === 4,
      })}
    >
      <div className={styles.vote__imgWrap}>
        <img
          src={
            activeVote.id === 4
              ? ruza
              : activeVote.id === 2
              ? vlada
              : activeVote.id === 3
              ? pair
              : ivan
          }
          alt="ruza"
          className={styles.vote__img}
        />
      </div>
      <div
        className={cn(styles.vote__blur, {
          [styles.vote__blur_1]: activeVote.id === 1,
          [styles.vote__blur_2]: activeVote.id === 2,
          [styles.vote__blur_3]: activeVote.id === 3,
          [styles.vote__blur_4]: activeVote.id === 4,
        })}
      />
      <div className={styles.vote__content}>
        <h1 className={styles.vote__title}>А что если...</h1>
        {activeVote.options.map((opt, index) => (
          <div
            className={cn(styles.radio, {
              [styles.radio_active]: selectedOption === opt.id,
            })}
            key={index}
          >
            <input
              id={String(opt.id)}
              type="radio"
              name={String(activeVote.id)}
              className={styles.radio__input}
              onChange={() => setSelectedOption(opt.id)}
            />
            <label htmlFor={String(opt.id)} className={styles.radio__label}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={styles.radio__icon}
              >
                <circle cx="12" cy="12" r="11.5" stroke="white" />
                {selectedOption === opt.id && (
                  <path
                    d="M11.8636 2.72729C12.0055 7.8639 16.1361 11.9946 21.2727 12.1364C16.1361 12.2782 12.0055 16.4089 11.8636 21.5455C11.7218 16.4089 7.59113 12.2782 2.45453 12.1364C7.59113 11.9946 11.7218 7.8639 11.8636 2.72729Z"
                    fill="white"
                  />
                )}
              </svg>
              {opt.text}
            </label>
          </div>
        ))}
        <Button
          cn={styles.vote__btn}
          onClick={() =>
            selectedOption && handleVote(activeVote.id, selectedOption)
          }
          text={"Проголосовать"}
          disabled={!selectedOption}
        />
      </div>
    </div>
  );
};
