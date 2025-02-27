import { useState, useRef, useEffect } from "react";
import { textLanding } from "../helpers/textHelper";
import { LandingCanvas } from "../components/landing/LandingCanvas";
import { sounds as audio } from "../helpers/audioHelper";
import ProgressCounter from "../components/landing/ProgressCounter";
import styles from "../components/landing/style.module.scss";

const LandingPage = () => {
  const sounds = audio;
  const [clickCounter, setClickCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true); // Use state for scroll lock
  const audioIndex = useRef(0); // Tracks the correct sound index
  const audioRef = useRef(new Audio(sounds[0])); // Initialize audio instance

  useEffect(() => {
    const handleScroll = (e) => {
      if (isLocked) {
        // e.preventDefault();
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
  }, [isLocked, clickCounter]);

  const handleClick = () => {
    if (isLocked) {
      if (!audioRef.current.paused) return; // Prevent spamming clicks

      // **1. Update color immediately**
      setClickCounter((prev) => prev + 1);

      // **2. Play the correct sound in sequence**
      const soundIndex = Math.min(audioIndex.current, sounds.length - 1);
      audioRef.current.src = sounds[soundIndex];

      try {
        audioRef.current.currentTime = 0; // Reset sound to start
        audioRef.current.play();

        // **3. Ensure the next sound plays only after this one ends**
        audioRef.current.onended = () => {
          if (audioIndex.current < sounds.length - 1) {
            audioIndex.current += 1; // Move to the next sound
          } else {
            setIsLocked(false); // Unlock after the last sound
          }
        };
      } catch (err) {
        console.error("Error playing sound:", err);
      }
    }
  };

  return (
    <section id="landing" onClick={handleClick}>
      <div className="veil"></div>
      <LandingCanvas clickCounter={clickCounter} />
      <div className="landing-text">
        <div className="pre-mask">{textLanding(isLocked)}</div>
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

export default LandingPage;
