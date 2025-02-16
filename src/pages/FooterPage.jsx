import { motion } from "framer-motion"; // Import motion from framer-motion for animation
import { useRef, useState } from "react"; // Import useRef for element reference and useState for managing state

export const FooterPage = () => {
  // Create a reference to track the position of each element
  const ref = useRef();

  // State to store the mouse position relative to the element
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Mouse move handler: updates the position of the element based on the mouse position
  const mouseMove = (e) => {
    const { clientX, clientY } = e; // Get the mouse position on the screen
    const { width, height, left, top } = ref.current.getBoundingClientRect(); // Get the size and position of the element

    // Calculate the mouse position relative to the element's center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Update state with the new position
    setPosition({ x, y });
  };

  // Mouse leave handler: resets the position to (0, 0) when the mouse leaves the element
  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Destructure the position values for easier usage in animation
  const { x, y } = position;

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-items">
            {/* The motion.p element is used for animated paragraphs */}
            <motion.p
              ref={ref} // Attach the ref to the element
              onMouseMove={mouseMove} // Attach the mouseMove handler
              onMouseLeave={mouseLeave} // Attach the mouseLeave handler
              animate={{ x, y }} // Animate the position based on the state values
              transition={{
                type: "spring", // Use a spring animation for smooth movement
                stiffness: 150, // The stiffness of the spring (controls the speed)
                damping: 15, // The damping (controls how quickly the motion settles)
                mass: 0.1, // The mass of the element (affects the bounce)
              }}
            >
              EMAIL
            </motion.p>
            <motion.p
              ref={ref} // Attach the same ref for this element (could be unique for each)
              onMouseMove={mouseMove} // Attach the mouseMove handler
              onMouseLeave={mouseLeave} // Attach the mouseLeave handler
              animate={{ x, y }} // Animate the position based on the state values
              transition={{
                type: "spring", // Use a spring animation for smooth movement
                stiffness: 150,
                damping: 15,
                mass: 0.1,
              }}
            >
              LINKEDIN
            </motion.p>
            <motion.p
              ref={ref} // Attach the same ref for this element (could be unique for each)
              onMouseMove={mouseMove} // Attach the mouseMove handler
              onMouseLeave={mouseLeave} // Attach the mouseLeave handler
              animate={{ x, y }} // Animate the position based on the state values
              transition={{
                type: "spring", // Use a spring animation for smooth movement
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
