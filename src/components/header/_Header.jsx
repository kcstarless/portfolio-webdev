import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import SidePanel from "./SidePanel";
import {
  logoTextAnimation,
  menuTextAnimation,
} from "../../helpers/textAnimationHelper";
import styles from "./style.module.scss";

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(scrollY.get() > window.innerHeight);
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  if (!showHeader) {
    return null;
  }

  return (
    <div className={styles.sticky_wrapper}>
      <motion.header className={styles.header}>
        <div className={styles.logo_container}>
          <div className={styles.logo_text}>
            <a href="/">{logoTextAnimation("DAVID GIM")}</a>
          </div>
        </div>
        <div className={styles.menu_container}>
          <div className={styles.blog_button}>
            <a
              href="https://gimdev-lingering-sun-6640.fly.dev/"
              data-text="BLOG"
              target="_blank"
              className="menu_link"
            >
              <span>{menuTextAnimation("BLOG")}</span>
            </a>
          </div>
          <SidePanel />
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
