/*eslint-disable */
import styled from "styled-components";
import { HiBriefcase } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import AddProjectForm from "../../features/user-panel/AddProjectForm";
import ProjectItem from "../../features/user-panel/ProjectItem";

import { useProjects } from "../../features/user-panel/useProjects";

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-brand-500);
  font-size: 3rem;
  font-weight: 700;
`;

function ProjectsPage() {
  const { projects, isLoadingProjects } = useProjects();

  return (
    <div>
      {/* title */}
      <Title>
        <HiBriefcase />
        <p>پروژه های شما</p>
      </Title>

      {/* Add Project */}
      <AddProjectForm />

      {/* Projects List */}
      {isLoadingProjects ? (
        <Spinner />
      ) : (
        projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))
      )}
    </div>
  );
}

export default ProjectsPage;
