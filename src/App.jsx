import SmoothScroll from "./helpers/SmoothScroll";
import Content from "./pages/Content";
import Header from "./components/header/_Header";
import { useEffect, useCallback, useState } from "react";
import { LandingCanvas } from "./components/landing/LandingCanvas";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Global loading state
  const [headerClass, setHeaderClass] = useState(""); // State to manage header class

  // Reset window scroll position on page reload
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition();
    };

    const checkIfLoaded = () => {
      const videos = document.querySelectorAll("video");
      const videoPromises = Array.from(videos).map(
        (video) =>
          new Promise((resolve) => {
            if (video.readyState >= 3) {
              // Video is already loaded
              resolve();
            } else {
              // Wait for the video to load
              video.addEventListener("loadeddata", resolve, { once: true });
            }
          })
      );

      Promise.all(videoPromises).then(() => {
        setTimeout(() => setIsLoading(false), 500); // Add a slight delay for smooth transition
      });
    };

    // Check document.readyState and set event listener for 'load' event
    if (document.readyState === "complete") {
      checkIfLoaded();
    } else {
      window.addEventListener("load", checkIfLoaded);
    }

    return () => {
      window.removeEventListener("load", checkIfLoaded);
    };
  }, [resetWindowScrollPosition]);

  // Lock scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
          }}
        >
          <LandingCanvas clickCounter={0} />
        </div>
        <SmoothScroll>
          <Header headerClass={headerClass} />
          <Content setHeaderClass={setHeaderClass} />
        </SmoothScroll>
      </div>
    </>
  );
}

export default App;
