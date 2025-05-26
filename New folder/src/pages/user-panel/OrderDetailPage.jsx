/*eslint-disable */
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useOrders } from "../../features/user-panel/useOrders";

import OrderDetailHeader from "../../features/user-panel/OrderDetailHeader";
import Spinner from "../../ui/Spinner";

const StyledOrderDetailPage = styled.div`
  min-height: 80vh;
`;

function OrderDetailPage() {
  const { projectId, orderId } = useParams(); // type of String
  const { orders, isLoadingOrders } = useOrders();

  if (isLoadingOrders) return <Spinner />;

  let matchingOrders;
  let selectedOrder;
  if (!isLoadingOrders) {
    matchingOrders = orders.filter(
      (order) => order.project_id === Number(projectId)
    );

    selectedOrder = matchingOrders.filter(
      (order) => order.id === Number(orderId)
    );
    console.log("selected", selectedOrder);
  }

  return (
    <StyledOrderDetailPage>
      <OrderDetailHeader order={selectedOrder[0]} />
    </StyledOrderDetailPage>
  );
}

export default OrderDetailPage;
