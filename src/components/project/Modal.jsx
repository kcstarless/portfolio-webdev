import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import styles from "./style.module.scss";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },

  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },

  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const Modal = ({ modal, projects }) => {
  const { active, index } = modal;
  const modalContainer = useRef(null);

  useEffect(() => {
    if (!active) return; // Only track mouse when modal is active

    const xMove = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.2,
      ease: "power3",
    });

    const yMove = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.2,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      xMove(e.clientX);
      yMove(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [active]);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modalContainer}
      >
        <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
          {projects()
            .reverse()
            .map((project, index) => (
              <div className={styles.modal} key={`modal_${index}`}>
                <img src={project.thumb} width={300} height={0} alt="image" />
              </div>
            ))}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
