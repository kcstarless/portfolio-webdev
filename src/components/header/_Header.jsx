import { useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import {
  logoTextAnimation,
  menuTextAnimation,
} from "../../helpers/textAnimationHelper";
import styles from "./style.module.scss";

const logoExtended = "";
const logoShortened = "D";

const Header = () => {
  const [logo, setLogo] = useState(logoExtended); // Track logo state
  const [isExpanded, setIsExpanded] = useState(true); // Track if the logo is expanded

  // Track the scroll position
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Handle scroll position to change the logo text based on scroll progress
    const unsubscribe = scrollYProgress.on("change", (progress) => {
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

  return (
    <div className={styles.sticky_wrapper}>
      <motion.header>
        <div className={styles.logo_container}>
          <div
            className={`${styles.logo_text} ${
              isExpanded ? styles.expanded : styles.small
            }`}
            key={logo}
          >
            <a href="/">{logoTextAnimation(logo)} </a>
            {/* Render animated logo text */}
          </div>
        </div>

        <div className={styles.menu_container}>
          <div className={styles.menu_item}>
            <a
              href="https://gimdev-lingering-sun-6640.fly.dev/"
              data-text="BLOG"
              target="_blank"
              className="menu_link"
            >
              <span>{menuTextAnimation("BLOG")}</span>
            </a>
          </div>
          <div className={styles.menu_item}>
            <a
              href="mailto:example@example.com"
              data-text="CONTACT"
              className="menu_link"
            >
              <span>{menuTextAnimation("CONTACT")}</span>
            </a>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
