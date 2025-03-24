import styles from "./style.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.center}>Current Project</div>
    </div>
  );
};

const CurrentProject = () => {
  return (
    <section id={styles.currentProject}>
      <div className={styles.container}>
        <div className={styles.main_container}>
          <Header />
        </div>
      </div>
    </section>
  );
};
export default CurrentProject;
