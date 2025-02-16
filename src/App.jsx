import SmoothScroll from "./components/SmoothScroll"; // Path to the SmoothScroll component
import Content from "./pages/Content";
import HeaderBar from "./components/HeaderBar";

function App() {
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
