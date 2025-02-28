import { useState, useRef, useEffect } from "react";
import { textLanding } from "../../helpers/textHelper";
import { LandingCanvas } from "./LandingCanvas";
import { sounds as audio } from "../../helpers/audioHelper";
import ProgressCounter from "./ProgressCounter";
import styles from "./style.module.scss";

const Landing = () => {
  const [clickCounter, setClickCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true); // Use state for scroll lock
  const audioIndex = useRef(0); // Tracks the correct sound index

  useEffect(() => {
    const handleScroll = (e) => {
      if (isLocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners with capture phase
    const options = { passive: false, capture: true };
    window.addEventListener("wheel", handleScroll, options);
    window.addEventListener("touchmove", handleScroll, options);

    return () => {
      window.removeEventListener("wheel", handleScroll, options);
      window.removeEventListener("touchmove", handleScroll, options);
    };
  }, [isLocked]);

  const handleClick = () => {
    if (isLocked) {
      // Update color immediately
      setClickCounter((prev) => prev + 1);

      // Create a new Audio instance for each click
      const newAudio = new Audio(audio[audioIndex.current]);

      try {
        newAudio.currentTime = 0; // Reset sound to start
        newAudio.play();

        // Move to the next sound in the sequence
        if (audioIndex.current < audio.length - 1) {
          audioIndex.current += 1; // Move to the next sound
        } else {
          setIsLocked(false); // Unlock after the last sound
        }
      } catch (err) {
        console.error("Error playing sound:", err);
      }
    }
  };

  return (
    <section id={styles.landing} onClick={handleClick}>
      <div className={styles.veil}></div>
      <LandingCanvas clickCounter={clickCounter} />
      <div className={styles.landing_text}>
        <div className={styles.pre_mask}>{textLanding(isLocked, styles)}</div>
      </div>
      <div
        className={`${styles.progressCounterWrapper} ${
          clickCounter <= 4 ? "" : styles.hidden
        }`}
      >
        <ProgressCounter clickCounter={clickCounter} />
      </div>
    </section>
  );
};

export default Landing;
