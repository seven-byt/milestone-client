import { useEffect, useState } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

interface IScale {
  id: number;
  className: string;
  text: string;
  percent: number;
}

export const Scale = ({ id, className, text, percent }: IScale) => {
  const [curPercent, setCurPercent] = useState(0);

  useEffect(() => {
    if (!percent) return;
    if (curPercent !== percent) {
      setTimeout(() => setCurPercent((prevState) => (prevState += 1)), 30);
    }
  }, [curPercent]);

  return (
    <div
      className={cn(className, styles.scale)}
      style={{
        height: `calc(${curPercent}% + 110px)`,
      }}
    >
      <div
        className={cn(styles.scale__graph, {
          [styles.scale__graph_ivan]: id === 1,
          [styles.scale__graph_vlada]: id === 2,
          [styles.scale__graph_pair]: id === 3,
          [styles.scale__graph_ruza]: id === 4,
        })}
      >
        <span
          className={cn(styles.scale__graphCircle, {
            [styles.scale__graphCircle_ivan]: id === 1,
            [styles.scale__graphCircle_vlada]: id === 2,
            [styles.scale__graphCircle_pair]: id === 3,
            [styles.scale__graphCircle_ruza]: id === 4,
          })}
        ></span>
      </div>

      <div className={styles.info}>
        <p className={styles.info__percent}>{curPercent}%</p>
        <p className={styles.info__text}>{text}</p>
      </div>
    </div>
  );
};
