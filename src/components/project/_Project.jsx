import ProjectCanvas from "./ProjectCanvas";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectList } from "./ProjectList";
import styles from "./style.module.scss";

const Project = () => {
  return (
    <section id={styles.project}>
      <ProjectHeader />
      <ProjectCanvas />
      <ProjectList />
    </section>
  );
};

export default Project;
