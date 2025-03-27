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

const AboutMe = () => {
  const [activeIndex, setActiveIndex] = useState(17);
  const [rotate, setRotate] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
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
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest >= 0.95 && !rotate) {
        setRotate(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, rotate]);

  return (
    <section id={styles.aboutme}>
      {/* Title container */}
      <motion.div
        ref={titleRef}
        className={styles.titleContainer}
        style={{ y }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.headerText}
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
          )}
          &nbsp;
        </motion.h1>

        {/* Render subtext only when animateLogo is true */}
        {animateLogo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.subText}
          >
            <p>{subText}</p>
          </motion.div>
        )}
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
                animate={{ opacity: index === activeIndex ? 1 : 0.3 }}
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
