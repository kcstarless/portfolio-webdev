import SmoothScroll from "./helpers/SmoothScroll";
import Content from "./pages/Content";
import HeaderBar from "./pages/HeaderBar";
import { useEffect, useCallback } from "react";

function App() {
  // Reset window scroll position on page reload
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);

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
