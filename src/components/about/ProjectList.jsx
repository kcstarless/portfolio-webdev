import { useState } from "react";
import { ProjectTitles } from "./ProjectTitles";
import { ProjectDesc } from "./ProjectDesc";
import styles from "./style.module.scss";
const list = [
  {
    title: "WEB",
    description: "FULL-STACK DEVELOPER IN MELBOURNE, AUSTRALIA",
    speed: 0.5,
    link: "https://gimdev-lingering-sun-6640.fly.dev/",
  },
  {
    title: "DESIGN",
    description: "CRAFTING INTUITIVE AND IMPACTFUL UI/UX.",
    speed: 0.5,
    link: "https://pokemon-theta-eosin.vercel.app/",
  },
  {
    title: "CONNECT",
    description:
      "SEAMLESSLY INTEGRATING SYSTEMS AND DATA FOR EFFICIENT SOLUTIONS.",
    speed: 1,
    link: "https://flyaway-rails-react.fly.dev/",
  },
  {
    title: "COLLABORATE",
    description: "READY TO BUILD SOMETHING GREAT TOGETHER.",
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
