import { percentVotes } from "../../helpers/percentVotes";
import { Button } from "../../shared";
import styles from "./index.module.scss";
import { IVoteControl } from "./types";

export const VoteControl = ({
  title,
  id,
  vote,
  handleEnableVote,
  handleCompleteVote,
  handleResultsVote,
}: IVoteControl) => {
  return (
    <div className={styles.voteControl}>
      <h2 className={styles.voteControl__title}>{title}</h2>
      <div className={styles.voteControl__btnsWrap}>
        <Button
          cn={styles.voteControl__btn}
          text={"Запустить"}
          onClick={() => handleEnableVote(id)}
        />
        <Button
          cn={styles.voteControl__btn}
          text={"Запустить результаты"}
          onClick={() => handleResultsVote(id)}
        />
        <Button
          cn={styles.voteControl__btn}
          text={"Завершить"}
          onClick={() => handleCompleteVote(id)}
        />

        <div className={styles.result}>
          {vote.options.map((opt, index) => (
            <div key={index} className={styles.resItem}>
              <p className={styles.resItem__title}>{opt.text}</p>
              <p className={styles.resItem__value}>
                {index === 0
                  ? percentVotes(vote.options[0].votes, vote.options[1].votes)
                  : 100 -
                    percentVotes(vote.options[0].votes, vote.options[1].votes)}
                %
              </p>
            </div>
          ))}
        </div>
        <p className={styles.resItem__title}>
          Статус:{" "}
          {vote.enabled
            ? "Активен"
            : vote.results
            ? "Результаты"
            : vote.completed
            ? "Завершен"
            : "Не активен"}
        </p>
      </div>
    </div>
  );
};
