import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null); // Reference to the scroll container

  useEffect(() => {
    // Initialize Lenis on mount
    const lenis = new Lenis({
      duration: 1.2, // Smooth scroll duration, adjust as needed
      easing: (t) => t * (2 - t), // Easing function (default is ease-in-out)
      direction: "vertical", // Direction of scrolling
      smoothWheel: true, // Enable smooth scroll with mouse wheel
      smoothTouch: true, // Enable smooth scroll with touch events (for mobile)
      infinite: false, // Infinite scroll is disabled by default
    });

    // Request animation frame for smooth scroll
    function animate(time) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }

    // Start the animation frame loop
    requestAnimationFrame(animate);

    // Cleanup: Destroy the Lenis instance on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
