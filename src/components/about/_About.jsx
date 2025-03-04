import styles from "./style.module.scss";
import projects from "./projects";
import { useEffect } from "react";

const About = () => {
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

  return (
    <div className={styles.sticky_wrapper}>
      <section id={styles.about}>
        <div className={styles.project_header}>PROJECTS</div>

        <div className={styles.project_list}>
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
      </section>
    </div>
  );
};

export default About;
