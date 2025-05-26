/*eslint-disable */
import styled from "styled-components";
import { HiBriefcase } from "react-icons/hi2";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

import AddProjectForm from "../../features/user-panel/AddProjectForm";
import ProjectItem from "../../features/user-panel/ProjectItem";

import { useProjects } from "../../features/user-panel/useProjects";

const StyledProjectsPage = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-brand-500);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const NoData = styled.div`
  color: var(--color-grey-500);
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10rem;
  text-align: center;
`;

function ProjectsPage() {
  const { projects, isLoadingProjects } = useProjects();

  return (
    <StyledProjectsPage>
      {/* title */}
      <Title>
        <HiBriefcase />
        <p>پروژه های شما</p>
      </Title>

      {/* Add Project */}
      <Modal>
        <Modal.Open opens="add-form">
          <Button variation="continue">افزودن پروژه جدید</Button>
        </Modal.Open>
        <Modal.Window name="add-form" styles={{ padding: "0rem" }}>
          <AddProjectForm />
        </Modal.Window>
      </Modal>

      {/* Projects List */}
      {isLoadingProjects ? (
        <Spinner />
      ) : projects?.length > 0 ? (
        projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))
      ) : (
        <NoData> پروژه ای جهت نمایش ندارید. </NoData>
      )}
    </StyledProjectsPage>
  );
}

export default ProjectsPage;
