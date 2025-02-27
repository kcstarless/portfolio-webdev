import { useState } from "react";
import { ProjectTitles } from "./ProjectTitles";
import { ProjectDesc } from "./ProjectDesc";
import styles from "./style.module.scss";
const list = [
  {
    title: "GimDev",
    description:
      "Web development blog built using Rails, Hotwire, Stimulus, and Three.js, providing a dynamic, interactive platform where users can create, update, and delete post",
    speed: 0.5,
    link: "https://gimdev-lingering-sun-6640.fly.dev/",
  },
  {
    title: "Memory",
    description:
      "A React-based browser game that tests players' memory by randomly shuffling Pokémon cards. The game increases in difficulty as players progress, testing their focus and recall under time pressure.",
    speed: 0.5,
    link: "https://pokemon-theta-eosin.vercel.app/",
  },
  {
    title: "Flyaway",
    description:
      "Inspired by Skyscanner and Google Flight Search, Flyaway is a flight search and booking app that allows users to find, pay and book flights based on their departure and destination cities.",
    speed: 1,
    link: "https://flyaway-rails-react.fly.dev/",
  },
  {
    title: "Odinbook",
    description:
      "Odinbook is a Ruby on Rails social media app that allows users to view profiles, create posts, and interact through comments, follows, and likes.",
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
