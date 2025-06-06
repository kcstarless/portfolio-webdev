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

const subText = `I'm a passionate web developer who enjoys building interactive and
user-friendly websites. With experience in both designing the visuals and making sure
everything works smoothly behind the scenes, I aim to create seamless online experiences.
I thrive on solving challenges and continually learning to keep up with the evolving
digital world.`;

const AboutMe = ({ isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(17);
  const [rotate, setRotate] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const wordsRef = useRef([]);

  // Scroll animation for title
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-44vh", "0vh"]);

  // Trigger logo animation when 50% of the section is visible
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest >= 0.5) {
        setAnimateLogo(true);
      } else {
        setAnimateLogo(false);
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

  // Detect when title reaches center to enable auto-rotate
  useEffect(() => {
    setRotate(true);
  }, [rotate]);

  return (
    <section id={styles.aboutme}>
      {/* Title container */}
      <div className={styles.titleContainer}>
        <h1 className={styles.headerText}>{logoTextAnimation("ABOUT ME")}</h1>
        <div className={styles.subText}>
          <p>{subText}</p>
        </div>
      </div>

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
                animate={{ opacity: index === activeIndex ? 1 : 0.3 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {word}
              </motion.h1>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className={styles.scrollDown}>
        {isLoading ? (
          <motion.div
            className={styles.loading}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className={styles.arrow}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.div>
            <p>Scroll Down</p>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
