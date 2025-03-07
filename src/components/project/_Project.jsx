import styles from "./style.module.scss";
import projects from "./projects";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { menuTextAnimation } from "../../helpers/textAnimationHelper";

const Project = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [modal, setModal] = useState({ active: false, index: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const about = document.querySelector("#about");
      if (about) {
        const scrollPosition = window.scrollY;
        about.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setIsExpanding(!isExpanding);
    setTimeout(() => {
      console.log("View All Clicked");
    }, 1000);
  };

  const handleProjectLink = (link) => {
    if (link) {
      window.open(link, "_blank"); // Opens in a new tab
    }
  };

  return (
    <div className={styles.sticky_wrapper}>
      <section id={styles.project}>
        <div className={styles.project_header}>
          <div className={styles.project_header_title}>PROJECTS</div>
          <div className={styles.project_header_viewall}>
            <div
              className={styles.link}
              onClick={handleClick}
              data-text={isExpanding ? "←" : "→"}
            >
              <span>
                {menuTextAnimation(isExpanding ? "VIEW LESS" : "VIEW MORE")}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.projects_container}>
          <div
            className={`${styles.project_list} ${
              isExpanding ? styles.active : ""
            }`}
          >
            {projects()
              .slice(-4)
              .reverse()
              .map((project, index) => (
                <div key={index} className={styles.project_card}>
                  <div className={styles.image_overlay}></div>
                  <img src={project.thumb} className={styles.project_image} />

                  <div className={styles.project_number}>
                    <span className={styles.number}>{project.id}</span>
                  </div>

                  <div className={styles.project_details}>
                    <div className={styles.project_name}>{project.name}</div>
                    <div className={styles.project_tech}>
                      {project.tech_stack.map((tech, index) => (
                        <span key={index}>
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className={styles.tech_icon}
                          />
                        </span>
                      ))}
                    </div>

                    <div className={styles.project_desc}>{project.short}</div>
                    <div className={styles.project_links}>
                      <a href={project.site_link}>DEMO</a>
                      <a href={project.github_link}>GITHUB</a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={`${styles.project_listall_container} ${
              isExpanding ? styles.active_all : ""
            }`}
          >
            <div className={styles.project_listall}>
              {projects()
                .reverse()
                .map((project, index) => (
                  <div
                    key={index}
                    className={styles.project_card}
                    onMouseEnter={() => {
                      setModal({ active: true, index });
                    }}
                    onMouseLeave={() => {
                      setModal({ active: false, index });
                    }}
                    onClick={() => handleProjectLink(project.site_link)}
                  >
                    <div className={styles.number}>{project.id}</div>
                    <div className={styles.project_name}>{project.name}</div>
                    <div className={styles.project_short}>{project.short}</div>
                    <div className={styles.year_container}>
                      <div className={styles.project_year}>{project.year}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* <Modal modal={modal} projects={projects} /> */}
      </section>
    </div>
  );
};

export default Project;
