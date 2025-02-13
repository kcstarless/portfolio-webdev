import ProjectCanvas from "../components/project/ProjectCanvas";
import { ProjectHeader } from "../components/project/ProjectHeader";
import { ProjectList } from "../components/project/ProjectList";

const ProjectPage = () => {
  return (
    <section id="project">
      <ProjectHeader />
      <ProjectCanvas />
      <ProjectList />
    </section>
  );
};

export default ProjectPage;
