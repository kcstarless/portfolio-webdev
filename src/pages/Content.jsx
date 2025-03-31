import Footer from "../components/footer/_Footer";
import About from "../components/about/_About";
import Project from "../components/project/_Project";
import AboutMe from "../components/aboutme/_AboutMe";
import HowIWork from "../components/howiwork/_HowIWork";
import CurrentProject from "../components/currentproject/_CurrentProject";

const Content = () => {
  return (
    <>
      <AboutMe />
      <HowIWork />
      <CurrentProject />
      <Project />
      <About />
    </>
  );
};

export default Content;
