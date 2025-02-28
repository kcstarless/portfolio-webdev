import { useState } from "react";
import { ProjectTitles } from "./ProjectTitles";
import { ProjectDesc } from "./ProjectDesc";
import styles from "./style.module.scss";
const list = [
  {
    title: "I AM",
    description: "A full-stack developer from Melbourne, Australia.",
    speed: 0.5,
    link: "https://gimdev-lingering-sun-6640.fly.dev/",
  },
  {
    title: "I LIKE",
    description: "To solve problems, play with colors and create things.",
    speed: 0.5,
    link: "https://pokemon-theta-eosin.vercel.app/",
  },
  {
    title: "I BELIEVE",
    description: "In simplicity, coherence, perspective and good design.",
    speed: 1,
    link: "https://flyaway-rails-react.fly.dev/",
  },
  {
    title: "AVAILABLE",
    description: "Lets work together!",
    speed: 1,
    link: "https://theodinbook.fly.dev/",
  },
];

export const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <>
      <div className={styles.project_list}>
        <ProjectTitles list={list} setSelectedProject={setSelectedProject} />
        <ProjectDesc list={list} selectedProject={selectedProject} />
      </div>
    </>
  );
};
