import { motion, AnimatePresence } from "framer-motion";

export const landingPageText = (text) => {
  return (
    <AnimatePresence>
      <motion.div
        key={text}
        initial="hidden"
        animate="visible"
        exit={{
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: "easeOut",
        }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }, // Adjust the delay between letters
          },
          exit: {
            transition: { staggerChildren: 0.1, staggerDirection: -1 },
          },
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export const logoTextAnimation = (text) => {
  return (
    <AnimatePresence>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 30,
            transition: {
              delay: (text.length - index - 1) * 0.05,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          transition={{
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="letter"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};

export const menuTextAnimation = (text) => {
  return (
    <AnimatePresence>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            y: 30,
            transition: {
              delay: (text.length - index - 1) * 0.05,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          transition={{
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut",
          }}
          className="letter"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};
