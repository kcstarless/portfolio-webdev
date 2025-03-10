import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";

import step01 from "../../assets/videos/step01.mp4";
import step01_image from "../../assets/videos/step01_image.png";
import step02 from "../../assets/videos/step02.mp4";
import step02_image from "../../assets/videos/step02_image.png";
import step03 from "../../assets/videos/step03.mp4";
import step03_image from "../../assets/videos/step03_image.png";
import step04 from "../../assets/videos/step04.mp4";
import step04_image from "../../assets/videos/step04_image.png";
import step05 from "../../assets/videos/step05.mp4";
import step05_image from "../../assets/videos/step05_image.png";
import step06 from "../../assets/videos/step06.mp4";
import step06_image from "../../assets/videos/step06_image.png";

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

const Accordion = ({
  id,
  title,
  video,
  image,
  text,
  expanded,
  setExpanded,
}) => {
  const isOpen = id === expanded;
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]); // Play video when the accordion is expanded

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={id}
        onClick={() => setExpanded(isOpen ? null : id)}
        animate={{ width: isOpen ? "70vw" : "4vw" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={styles.accordion}
      >
        {!isOpen && (
          <div className={styles.accordion_preview}>
            <img
              className={styles.preview_image}
              src={image}
              style={{
                filter: isOpen ? "brightness(100%)" : "brightness(30%)",
              }}
            />
            <div className={styles.preview_title}>
              <div className={styles.id}>0{id}</div>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.accordion_content}
          >
            <div className={styles.accordion_preview}>
              <video
                ref={videoRef}
                className={styles.preview_image}
                src={video}
                muted
                loop
                playsInline
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }} // Delays text appearing
                className={styles.video_text}
              >
                {text}
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const HowIWork = () => {
  const [expanded, setExpanded] = useState(1); // Set to null initially

  return (
    <section id={styles.howiwork}>
      <div className={styles.container}>
        <Header expanded={expanded} />

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
      </div>
    </section>
  );
};

const accordionData = [
  {
    id: 1,
    title: "IDEA",
    video: step01,
    image: step01_image,
    text: "Every great project starts with a simple idea—a thought that gets the ball rolling.",
  },
  {
    id: 2,
    title: "RESEARCH",
    video: step02,
    image: step02_image,
    text: "Diving into the details to understand the audience and make sure it's doable.",
  },
  {
    id: 3,
    title: "SKETCH & DESIGN",
    video: step03,
    image: step03_image,
    text: "From rough sketches to polished designs, this is where I start bringing it to life.",
  },
  {
    id: 4,
    title: "DEVELOPMENT",
    video: step04,
    image: step04_image,
    text: "Turning ideas and designs into working code that does as expected.",
  },
  {
    id: 5,
    title: "TESTING & DEPLOYMENT",
    video: step05,
    image: step05_image,
    text: "Checking everything works as expected, then sharing it with the world.",
  },
  {
    id: 6,
    title: "MAINTENANCE & UPDATES",
    video: step06,
    image: step06_image,
    text: "Keeping things fresh with updates, fixing bugs, and making sure everything runs smoothly.",
  },
];

export default HowIWork;
