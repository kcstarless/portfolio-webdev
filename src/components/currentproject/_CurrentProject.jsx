import styles from "./style.module.scss";
import projects from "../project/projects";

import { useState } from "react";

const Header = () => {
  const project = projects()[projects().length - 1];
  return (
    <div className={styles.header}>
      <div className={styles.title}>Current Project</div>
      <div className={styles.projectTitle}>{project.name}</div>
    </div>
  );
};

const Overview = ({ project }) => {
  return (
    <div className={styles.overview}>
      <div className={styles.item}>
        <span className={styles.label}>Project No.</span>
        <span className={styles.value}>{project.id}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Project Title</span>
        <span className={styles.value}>{project.name}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Project Year</span>
        <span className={styles.value}>{project.year}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Duration</span>
        <span className={styles.value}>{project.duration}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Type</span>
        <span className={styles.value}>{project.type}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Tech Stack</span>
        <span className={styles.icon}>
          {" "}
          {project.tech_stack.map((tech, index) => (
            <span key={index} className={styles.techIcon}>
              <img src={tech.icon} alt={tech.name} class={styles.techIcon} />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

const Details = ({ project }) => {
  return (
    <div className={styles.details}>
      <div className={styles.item}>
        <span className={styles.details}>{project.details}.</span>
      </div>
    </div>
  );
};

const Design = ({ project }) => {
  return (
    <div className={styles.design}>
      <div className={styles.item}>
        {/* <span className={styles.details}>{project.design}.</span> */}
        <img src={project.images[0]} alt="Design" className={styles.image} />
      </div>
    </div>
  );
};

const Project = () => {
  const project = projects()[projects().length - 1];

  const [activeSection, setActiveSection] = useState("Overview");

  const renderContent = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <div className={styles.projectDetails}>
            <Overview project={project} />
          </div>
        );
      case "Details":
        return (
          <div className={styles.projectDetails}>
            <Details project={project} />
          </div>
        );
      case "Design":
        return (
          <div className={styles.projectDetails}>
            <Design project={project} />
          </div>
        );
      case "Challenges":
        return (
          <div className={styles.projectDetails}>{project.challenges}</div>
        );
      case "Key Features":
        return (
          <div className={styles.projectDetails}>{project.keyFeatures}</div>
        );
      case "Outcome":
        return <div className={styles.projectDetails}>{project.outcome}</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.menubar}>
        {[
          "Overview",
          "Details",
          "Design",
          "Challenges",
          "Key Features",
          "Outcome",
        ].map((section) => (
          <div
            key={section}
            className={styles.menuItem}
            aria-expanded={activeSection === section}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </div>
        ))}
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

const CurrentProject = () => {
  return (
    <section id={styles.currentProject}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <Header />
          <Project />
        </div>
      </div>
    </section>
  );
};
export default CurrentProject;
