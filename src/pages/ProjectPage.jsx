import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const ProjectPage = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: true,
        marker: true,
        onUpdate: (e) => (direction = e.direction * -1),
      },
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.05 * direction;
    requestAnimationFrame(animation);
  };

  return (
    <section id="project">
      <div className="project-container">
        <div className="project-title" ref={slider}>
          <p ref={firstText}>
            &nbsp;PROJECTS / 프로젝트 / PROJEKT / プロジェクト / ПРОЕКТЫ /
            PROGETTI / 项目 /{" "}
          </p>
          <p ref={secondText}>
            &nbsp;PROJECTS / 프로젝트 / PROJEKT / プロジェクト / ПРОЕКТЫ /
            PROGETTI / 项目 /{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
