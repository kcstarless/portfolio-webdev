import styles from "./aboutme.module.scss";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Scalable",
  "Movies",
  "COPY CAT",
  "Problem-solver",
  "Driven",
  "Introvert",
  "User-focused",
  "Leadership",
  "Big Eater",
  "Dynamic",
  "Self-Learner",
  "Creative",
  "Early Riser",
  "Design",
  "Health freak",
  "Swimmer",
  "Thinker",
  "Focused",
  "Listener",
  "COOK",
  "Resourceful",
  "Music",
  "Innovative",
  "Ice Cream",
  "Analytical",
  "Collaborative",
  "Versatile",
  "Passionate",
  "Visual",
  "Adaptable",
];

const AboutMe = () => {
  const [activeIndex, setActiveIndex] = useState(12);
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  // Calculate positions, centering word.
  const calculatePosition = (index) => {
    if (!containerRef.current || !wordsRef.current[index]) return 0;

    const containerHeight = containerRef.current.offsetHeight;
    let offset = 0;

    for (let i = 0; i < index; i++) {
      offset += wordsRef.current[i]?.offsetHeight || 0; // total offset height
    }

    const itemHeight = wordsRef.current[index].offsetHeight; // current active word height
    return offset + itemHeight / 2 - containerHeight / 2; // shifts the position and centers word
  };

  // Auto-change word
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * words.length);
        } while (newIndex === prev);
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={styles.aboutme}>
      <div className={styles.container}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          ABOUT ME&nbsp;
          <div className={styles.text_container} ref={containerRef}>
            <motion.div
              className={styles.words_wrapper}
              animate={{ y: -calculatePosition(activeIndex) }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <AnimatePresence initial={false}>
                {words.map((word, index) => (
                  <motion.span
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
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.h1>
      </div>
    </section>
  );
};

export default AboutMe;
