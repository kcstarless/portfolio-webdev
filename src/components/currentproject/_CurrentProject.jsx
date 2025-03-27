import styles from "./style.module.scss";
import projects from "../project/projects";
import kcmVideo from "../../assets/videos/kcm_video.mp4";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const project = projects()[projects().length - 1];
  return (
    <div className={styles.header}>
      <div className={styles.projectTitle}>
        <div className={styles.title}>Current Project</div>
        {project.name}
      </div>
    </div>
  );
};

// Overview, Details, Design, Challenges, Features, Outcome
const Overview = ({ project }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleMouseEnter = () => {
      video.play();
    };

    const handleMouseLeave = () => {
      video.pause();
      video.currentTime = 0; // Optional: Reset to the beginning
    };

    video.addEventListener("mouseenter", handleMouseEnter);
    video.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      video.removeEventListener("mouseenter", handleMouseEnter);
      video.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.separator}>
        {/* Project Details */}
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
            {project.tech_stack.map((tech, index) => (
              <span key={index} className={styles.techIcon}>
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={styles.techIcon}
                />
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.imageGrid}>
        <video
          ref={videoRef}
          src={kcmVideo}
          className={styles.video}
          muted
          playsInline
          loop
        />
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
      case "Features":
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
          "Features",
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
        {/* <div className={styles.container}> */}
        <Header />
        <Project />
        {/* </div> */}
      </div>
    </section>
  );
};
export default CurrentProject;
