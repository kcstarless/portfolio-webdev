import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const FooterPage = () => {
  const ref = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const mouseLeave = (e) => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-items">
            <motion.p
              ref={ref}
              onMouseMove={mouseMove}
              onMouseLeave={mouseLeave}
              animate={{ x, y }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              }}
            >
              EMAIL
            </motion.p>
            <motion.p
              ref={ref}
              onMouseMove={mouseMove}
              onMouseLeave={mouseLeave}
              animate={{ x, y }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              }}
            >
              LINKEDIN
            </motion.p>
            <motion.p
              ref={ref}
              onMouseMove={mouseMove}
              onMouseLeave={mouseLeave}
              animate={{ x, y }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              }}
            >
              GITHUB
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};
