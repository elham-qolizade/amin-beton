/*eslint-disable */
import { useParams } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";

import OrderItem from "../../features/user-panel/OrderItem";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useOrders } from "../../features/user-panel/useOrders";
import { useProject } from "../../features/user-panel/useProject";
import styled from "styled-components";

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
  const { projectId } = useParams(); // type of String
  const { project, isLoadingProject } = useProject(projectId);
  const { orders, isLoadingOrders } = useOrders();

  let selectedOrders;
  let finishedOrders;
  if (!isLoadingOrders) {
    selectedOrders = orders.filter(
      (order) => order.project_id === Number(projectId)
    );

    finishedOrders = selectedOrders.filter(
      (order) => order.step === "finished"
    );
  }

  console.log(finishedOrders);
  if (isLoadingOrders || isLoadingProject) return <Spinner />;
  return (
    <div>
      {/* Title */}
      <Title>
        <span className="project-name">{project.name}</span>
        <div className="title">
          <FaClockRotateLeft />
          <span>سابقه</span>
        </div>
      </Title>
      {/* Orders List */}
      {finishedOrders.length !== 0 ? (
        finishedOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default OrdersHistoryPage;
