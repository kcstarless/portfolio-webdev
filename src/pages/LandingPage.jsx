import { useState, useRef } from "react";
import { textAbout } from "../helpers/textHelper";
import { LandingCanvas } from "../components/landing/LandingCanvas";
import { sounds as audio } from "../helpers/audioHelper";

const LandingPage = () => {
  const sounds = audio;
  const [clickCounter, setClickCounter] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const audioIndex = useRef(0); // Tracks the correct sound index
  const audioRef = useRef(new Audio(sounds[0])); // Initialize audio instance

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
            setIsLocked(false); // Unlock after last sound
          }
        };
      } catch (err) {
        console.error("Error playing sound:", err);
      }
    }
  };

  return (
    <section id="about" onClick={handleClick}>
      <div className="veil"></div>
      <LandingCanvas clickCounter={clickCounter} />
      <div className="about-text">
        <div className="pre-mask">{textAbout(isLocked)}</div>
      </div>
    </section>
  );
};

export default LandingPage;
