import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Accordion from "./Accordion";
import { accordionData } from "./helper";

const Header = ({ expanded }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        0<span className={styles.number}>{expanded ? expanded : 0}</span>
      </div>
      <div className={styles.center}>HOW I WORK</div>
      <div className={styles.right}>06</div>
    </div>
  );
};

const HowIWork = () => {
  const [expanded, setExpanded] = useState(1);
  const [videosLoaded, setVideosLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const preloadContainer = document.createElement("div");
    preloadContainer.style.display = "none";

    accordionData.forEach(({ video }) => {
      const vid = document.createElement("video");
      vid.src = video;
      vid.preload = "auto";
      vid.oncanplaythrough = () => {
        loadedCount++;
        if (loadedCount === accordionData.length) {
          setVideosLoaded(true);
        }
      };
      preloadContainer.appendChild(vid);
    });

    document.body.appendChild(preloadContainer);

    return () => {
      document.body.removeChild(preloadContainer);
    };
  }, []);

  return (
    <section id={styles.howiwork}>
      <div className={styles.container}>
        <Header expanded={expanded} />
        {videosLoaded ? (
          <div className={styles.main_container}>
            {accordionData.map(({ id, title, video, image, text }) => (
              <Accordion
                key={id}
                id={id}
                title={title}
                video={video}
                image={image}
                text={text}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </div>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default HowIWork;
