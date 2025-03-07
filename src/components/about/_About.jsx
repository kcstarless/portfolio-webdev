import ProjectCanvas from "./ProjectCanvas";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectList } from "./ProjectList";
import styles from "./style.module.scss";

const About = () => {
  return (
    <section id={styles.about}>
      <ProjectHeader />
      <ProjectCanvas />
      <ProjectList />
    </section>
  );
};

export default About;
