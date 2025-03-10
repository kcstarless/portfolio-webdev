import styles from "./style.module.scss";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={id}
        onClick={() => setExpanded(isOpen ? null : id)}
        animate={{ width: isOpen ? "70vw" : "4vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
                transition={{ delay: 1, duration: 0.5 }}
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
export default Accordion;
