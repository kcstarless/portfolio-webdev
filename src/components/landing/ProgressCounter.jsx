import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const ProgressCounter = ({ clickCounter }) => {
  const [displayNumber, setDisplayNumber] = useState(5);

  // Update cursor position

  // Animate number change
  useEffect(() => {
    if (clickCounter <= 5) {
      setDisplayNumber(5 - clickCounter);
    }
  }, [clickCounter]);

  return (
    <motion.div className={styles.progressCounter}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayNumber}
          className={styles.counter}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {displayNumber}
        </motion.div>
      </AnimatePresence>

      {/* Text ring remains the same */}
      <svg className={styles.textRing} viewBox="0 0 100 100">
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text>
          <textPath xlinkHref="#circlePath">
            CLICK • TO • ADD • SOUND • COLOR •
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
};

export default ProgressCounter;
