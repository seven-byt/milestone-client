import styles from "./index.module.scss";

import soon from "../../assets/soon.png";

export const Soon = () => {
  return (
    <>
      <div className={styles.img}>
        <img src={soon} alt="" />
      </div>
      <p className={styles.text}>
        Скоро здесь начнется <br />
        голосование
      </p>
    </>
  );
};
