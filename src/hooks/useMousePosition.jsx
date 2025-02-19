import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (e) => {
    // If it's a mouse event, get the mouse position
    if (e.type === "mousemove") {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    // If it's a touch event, get the first touch position
    if (e.type === "touchmove") {
      const touch = e.touches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  useEffect(() => {
    // For mouse events
    window.addEventListener("mousemove", updateMousePosition);

    // For touch events (on touch screens)
    window.addEventListener("touchmove", updateMousePosition);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
