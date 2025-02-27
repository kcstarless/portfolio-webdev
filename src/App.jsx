import SmoothScroll from "./helpers/SmoothScroll";
import Content from "./pages/Content";
import HeaderBar from "./pages/HeaderBar";
import { useEffect, useCallback, useState } from "react";

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

    // Simulate waiting for everything to load (you can replace this with real resource loading logic)
    const handleWindowLoad = () => {
      setIsLoading(false); // Set to false when everything is loaded
    };

    // Add event listener for when the window has finished loading
    window.addEventListener("load", handleWindowLoad);

    // Cleanup event listener
    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, [resetWindowScrollPosition]);

  if (isLoading) {
    return <div className="loading-screen"></div>; // Or you can show a spinner/loading indicator
  }

  return (
    <>
      <SmoothScroll>
        <HeaderBar />
        <Content />
      </SmoothScroll>
    </>
  );
}

export default App;
