/*eslint-disable */
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useProject } from "./useProject";

import Spinner from "../../ui/Spinner";

const StyledOrderDetailHeader = styled.div``;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function OrderDetailHeader({ order }) {
  console.log("order is", order);
  const { projectId } = useParams(); // type of String
  const { project, isLoadingProject } = useProject(projectId);

  if (isLoadingProject) return <Spinner />;

  return (
    <StyledOrderDetailHeader>
      <Title>
        <span>{project.name}</span>
        <p>{order.product_name}</p>
      </Title>
    </StyledOrderDetailHeader>
  );
}

export default OrderDetailHeader;
