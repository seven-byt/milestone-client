import classNames from "classnames";
import { IButton } from "./types";

import styles from "./button.module.scss";

export const Button = ({ cn, text, onClick, disabled }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.btn, cn)}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
