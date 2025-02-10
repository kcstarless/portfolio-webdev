import { useEffect } from "react";
import LandingPage from "./LandingPage";
import ProjectPage from "./ProjectPage";
import TransitionPage from "./ProjectPage";

const Content = () => {
  useEffect(() => {
    async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    };
  }, []);

  return (
    <>
      <LandingPage />
      <ProjectPage />
    </>
  );
};

export default Content;
