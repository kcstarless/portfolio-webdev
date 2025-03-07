import { useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import styles from "./style.module.scss";

export const ProjectTitles = ({ list, setSelectedProject }) => {
  return (
    <>
      <div className={styles.titles}>
        {list.map((project, index) => {
          {
            return (
              <Title
                key={index}
                data={{ ...project, index }}
                setSelectedProject={setSelectedProject}
              />
            );
          }
        })}
      </div>
    </>
  );
};

function Title({ data, setSelectedProject }) {
  const { title, speed, index, link } = data;
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", `${10 / speed}vw end`],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

  function redirect() {
    window.open(link, "_blank");
  }

  return (
    <div ref={container} className={styles.title}>
      <div
        className={styles.wrapper}
        onMouseOver={() => {
          setSelectedProject(index);
        }}
        onMouseLeave={() => {
          setSelectedProject(null);
        }}
      >
        {/* <motion.p style={{ clipPath: clip }} onClick={() => redirect(link)}> */}
        <motion.p style={{ clipPath: clip }}>{title}</motion.p>

        <p>{title}</p>
      </div>
    </div>
  );
}
