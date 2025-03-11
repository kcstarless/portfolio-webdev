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
  const [videoURLs, setVideoURLs] = useState({});

  useEffect(() => {
    let loadedCount = 0;
    const videoCache = {};

    accordionData.forEach(({ video }) => {
      fetch(video, { method: "GET", cache: "force-cache" })
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          videoCache[video] = url;
          loadedCount++;

          if (loadedCount === accordionData.length) {
            setVideoURLs(videoCache);
            setVideosLoaded(true);
          }
        })
        .catch((err) => console.error("Video fetch error:", err));
    });
  }, []);

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .catch((err) =>
  //         console.error("Service Worker registration failed:", err)
  //       );
  //   }
  // }, []);

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
                video={videoURLs[video] || video} // Use cached video URL if available
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
