import SmoothScroll from "./helpers/SmoothScroll";
import Content from "./pages/Content";
import Header from "./components/header/_Header";
import { useEffect, useCallback, useState } from "react";
import { LandingCanvas } from "./components/landing/LandingCanvas";

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
      if (document.readyState === "complete") {
        setIsLoading(false);
      }
    };

    // Check document.readyState and set event listener for 'load' event
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", checkIfLoaded);
    }

    return () => {
      window.removeEventListener("load", checkIfLoaded);
    };
  }, [resetWindowScrollPosition]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner or other loading indicator
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* Ensure LandingCanvas is fixed and acts as a global background */}
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
          <Header />
          <Content />
        </SmoothScroll>
      </div>
    </>
  );
}

export default App;
