import styles from "./aboutme.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { words } from "./helper";
import { logoTextAnimation } from "../../helpers/textAnimationHelper";

const AboutMe = () => {
  const [activeIndex, setActiveIndex] = useState(12);
  const [rotate, setRotate] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false); // Add state to control logo animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const wordsRef = useRef([]);
  const countRef = useRef(0);
  const isLocked = useRef(false);

  // Scroll animation for title
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-44vh", "0vh"]);

  // Trigger logo animation when 25% of the section is visible
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest >= 0.5) {
        setAnimateLogo(true); // Trigger animation when 25% of the section is in view
      } else {
        setAnimateLogo(false); // Reset animation if it's out of view
      }
    });
  }, [scrollYProgress]);

  // Existing word position calculation
  const calculatePosition = (index) => {
    if (!containerRef.current || !wordsRef.current[index]) return 0;
    const containerHeight = containerRef.current.offsetHeight;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += wordsRef.current[i]?.offsetHeight || 0;
    }
    const itemHeight = wordsRef.current[index].offsetHeight;
    return offset + itemHeight / 2 - containerHeight / 2;
  };

  // Existing auto-rotate effect
  useEffect(() => {
    if (!rotate) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * words.length);
        } while (newIndex === prev);

        return newIndex;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [rotate]);

  // Detect when title reaches center
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest >= 0.95 && !rotate) {
        setRotate(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, rotate]);

  return (
    <section id={styles.aboutme}>
      {/* Separate title container */}
      <motion.div
        ref={titleRef}
        className={styles.title_container}
        style={{ y }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.header_text}
        >
          {animateLogo ? (
            logoTextAnimation("ABOUT ME")
          ) : (
            <span
              style={{
                visibility: "hidden",
                display: "inline-block",
                width: "auto",
                font: "inherit",
              }}
            >
              ABOUT ME
            </span>
          )}{" "}
          {/* Trigger animation only if the element is in view */}
          &nbsp;
        </motion.h1>
      </motion.div>

      {/* Words list container */}
      <div className={styles.words_container} ref={containerRef}>
        <motion.div
          className={styles.words_list}
          animate={{ y: -calculatePosition(activeIndex) }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <AnimatePresence initial={false}>
            {words.map((word, index) => (
              <motion.h1
                key={word + index}
                ref={(el) => (wordsRef.current[index] = el)}
                className={styles.word}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {word}
              </motion.h1>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
