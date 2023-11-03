import cn from "classnames";
import styles from "./styles.module.scss";

export const MainContent = () => {
  return (
    <section className={cn("screen", styles.main)}>
      <h1 className={styles.main__title}>Пожалуйста, отсканируйте QR-код</h1>
      {/* some img */}
    </section>
  );
};
