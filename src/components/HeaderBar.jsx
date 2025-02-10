import { useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import {
  logoTextAnimation,
  menuTextAnimation,
} from "../helpers/textAnimationHelper";

const logoExtended = "DAVID GIM";
const logoShortened = "D";

const HeaderBar = () => {
  const [logo, setLogo] = useState(logoExtended); // Track logo state
  const [isExpanded, setIsExpanded] = useState(true); // Track if the logo is expanded
  const [isScrolledToProject, setIsScrolledToProject] = useState(false); // Track if header is overlapped by project

  // Track the scroll position
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Handle scroll position to change the logo text based on scroll progress
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // Adjust this threshold based on your needs, here 50% scroll triggers the logo change
      if (progress > 0.1 && isExpanded) {
        setLogo(logoShortened); // Change logo to "D"
        setIsExpanded(false); // Collapse the logo
      } else if (progress <= 0.1 && !isExpanded) {
        setLogo(logoExtended); // Reset to the full logo
        setIsExpanded(true); // Expand the logo
      }
    });

    return () => {
      unsubscribe(); // Clean up the event listener when the component unmounts
    };
  }, [scrollYProgress, isExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const projectPage = document.getElementById("project");

      if (header && projectPage) {
        const headerTop = header.getBoundingClientRect().bottom;
        const projectTop = projectPage.getBoundingClientRect().top;

        // If the project section's top is below the header's bottom (i.e., overlapping)
        if (
          projectTop <= headerTop &&
          projectTop + projectPage.offsetHeight > headerTop
        ) {
          setIsScrolledToProject(true); // Set to true when the project section overlaps the header
        } else {
          setIsScrolledToProject(false); // Set to false when it's no longer overlapping
        }
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <motion.header
        className={isScrolledToProject ? "scrolled-to-project" : ""}
      >
        <div className="logo-container">
          <div
            className={`logo-text ${isExpanded ? "expanded" : "small"}`}
            key={logo}
          >
            {logoTextAnimation(logo)} {/* Render animated logo text */}
          </div>
        </div>

        <div className="menu-container">
          <div className="menu-item">
            <a href="#" data-text="BLOG">
              <span>{menuTextAnimation("BLOG")}</span>
            </a>
          </div>
          <div className="menu-item">
            <a href="#" data-text="CONTACT">
              <span>{menuTextAnimation("CONTACT")}</span>
            </a>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default HeaderBar;
