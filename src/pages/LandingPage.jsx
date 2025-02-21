import { motion } from "framer-motion";
import { textAbout, textAboutMask } from "../helpers/textHelper";
import useMousePosition from "../hooks/useMousePosition";
import { useRef, useEffect, useState } from "react";
import { LandingCanvas } from "../components/landing/LandingCanvas";

const LandingPage = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef(null); // Ref for the about-text-mask div
  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
  const size = isHovered ? 240 : 40;

  // Handle mouse/touch movement
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

  // Handle touch events for mobile devices
  const handleTouchStart = (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    if (maskRef.current) {
      const maskRect = maskRef.current.getBoundingClientRect(); // Get the element's position
      const offsetX = touchX - maskRect.left; // Calculate touch position relative to the element
      const offsetY = touchY - maskRect.top; // Calculate touch position relative to the element
      setMaskPosition({ x: offsetX, y: offsetY });
      setIsHovered(true); // Simulate hover on touch start
    }
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    if (maskRef.current) {
      const maskRect = maskRef.current.getBoundingClientRect(); // Get the element's position
      const offsetX = touchX - maskRect.left; // Calculate touch position relative to the element
      const offsetY = touchY - maskRect.top; // Calculate touch position relative to the element
      setMaskPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false); // Simulate mouse leave on touch end
  };

  return (
    <section id="about">
      <div className="veil"></div>
      <LandingCanvas />
      <motion.div className="about-text" data-scroll data-scroll-speed="0.1">
        <div
          className="pre-mask"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onTouchStart={handleTouchStart} // Handle touch start for mobile
          onTouchMove={handleTouchMove} // Handle touch move for mobile
          onTouchEnd={handleTouchEnd} // Handle touch end for mobile
        >
          {textAbout()}
        </div>
      </motion.div>
    </section>
  );
};

export default LandingPage;
