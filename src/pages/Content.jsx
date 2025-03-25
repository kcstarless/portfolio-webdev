import Footer from "../components/footer/_Footer";
import Landing from "../components/landing/_Landing";
import About from "../components/about/_About";
import Project from "../components/project/_Project";
import AboutMe from "../components/aboutme/_AboutMe";
import HowIWork from "../components/howiwork/_HowIWork";
import CurrentProject from "../components/currentproject/_CurrentProject";

const Content = () => {
  return (
    <>
      <Landing />
      <AboutMe />
      <HowIWork />
      <CurrentProject />
      <Project />
    </>
  );
};

export default Content;
