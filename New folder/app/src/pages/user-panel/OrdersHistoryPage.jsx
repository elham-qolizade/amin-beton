/*eslint-disable */
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaClockRotateLeft } from "react-icons/fa6";

import OrderItem from "../../features/user-panel/OrderItem";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";

// import { useOrders } from "../../features/user-panel/useOrders";
import { useProjects } from "../../features/user-panel/useProjects";
import { useProjectOrders } from "../../features/user-panel/useOrders";
import { useEffect } from "react";
// import { useProject } from "../../features/user-panel/useProject";

const StyledOrdersHistoryPage = styled.div`
  .back-button {
    margin-bottom: 3rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .project-name {
    color: var(--color-brand-500);
    font-weight: 700;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;

    font-size: 3rem;
    font-weight: 900;
  }
`;

function OrdersHistoryPage() {
  const navigate = useNavigate();
  const { projectId } = useParams(); // type of String
  const { isLoadingProjects, projects } = useProjects();
  const { isLoadingProjectOrders, getProjectOrders, projectOrders } =
    useProjectOrders();

  useEffect(() => {
    getProjectOrders(projectId);
  }, [getProjectOrders, projectId]);

  if (isLoadingProjectOrders || isLoadingProjects) return <Spinner />;

  let thisProject = projects.find(
    (project) => project.id === Number(projectId)
  );

  let finishedOrders = projectOrders?.filter((order) => order.status === 7);

  return (
    <StyledOrdersHistoryPage>
      <Button
        className="back-button"
        variation="continue"
        onClick={() => navigate(-1)}
      >
        بازکشت به صفحه خرید ها
      </Button>

      {/* Title */}
      <Title>
        <span className="project-name">{thisProject?.title}</span>

        <div className="title">
          <FaClockRotateLeft />
          <span>سابقه</span>
        </div>
      </Title>
      {/* Orders List */}
      {finishedOrders?.length !== 0 ? (
        finishedOrders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      ) : (
        <Empty />
      )}
    </StyledOrdersHistoryPage>
  );
}

export default OrdersHistoryPage;
