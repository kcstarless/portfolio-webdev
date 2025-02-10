import { motion } from "framer-motion";
import { textAbout, textAboutMask } from "../helpers/textHelper";
import useMousePosition from "../hooks/useMousePosition";
import { useRef, useEffect, useState } from "react";

const LandingPage = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef(null); // Ref for the about-text-mask div
  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
  const size = isHovered ? 240 : 40;

  useEffect(() => {
    if (maskRef.current) {
      const maskRect = maskRef.current.getBoundingClientRect(); // Get the element's position
      const offsetX = x - maskRect.left; // Calculate mouse position relative to the element
      const offsetY = y - maskRect.top; // Calculate mouse position relative to the element

      // Update mask position
      setMaskPosition({
        x: offsetX,
        y: offsetY,
      });
    }
  }, [x, y]);

  return (
    <section id="about">
      <motion.div className="about-text" data-scroll data-scroll-speed="0.1">
        <div
          className="pre-mask"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {textAbout()}
        </div>
      </motion.div>

      <motion.div
        ref={maskRef} // Assign ref to the element
        className="about-text-mask"
        animate={{
          WebkitMaskPosition: `${maskPosition.x - size / 2}px ${
            maskPosition.y - size / 2
          }px`, // Apply the calculated position
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut" }}
      >
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="mask"
        >
          {textAboutMask()}
        </div>
      </motion.div>
    </section>
  );
};

export default LandingPage;
