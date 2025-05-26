/*eslint-disable */
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useOrder } from "../../features/user-panel/useOrders";

import OrderDetailHeader from "../../features/user-panel/OrderDetailHeader";
import Spinner from "../../ui/Spinner";
import OrderDetailInvoice from "../../features/user-panel/OrderDetailInvoice";
import OrderDetailStatus from "../../features/user-panel/OrderDetailStatus";
import OrderDetailTransport from "../../features/user-panel/OrderDetailTransport";
import OrderDetailLocation from "../../features/user-panel/OrderDetailLocation";
import OrderDetailLab from "../../features/user-panel/OrderDetailLab";

const StyledOrderDetailPage = styled.div`
  min-height: 80vh;
`;

function OrderDetailPage() {
  const { orderId } = useParams(); // type of String
  const { order, isLoadingOrder } = useOrder(orderId);

  if (isLoadingOrder) return <Spinner />;
  console.log(order);

  return (
    <StyledOrderDetailPage>
      <OrderDetailHeader order={order} />

      <OrderDetailInvoice order={order} />

      <OrderDetailLocation
        latitude={order?.project?.latitude}
        longitude={order?.project?.longitude}
      />

      <OrderDetailStatus order={order} />

      <OrderDetailLab />

      <OrderDetailTransport order={order} />
    </StyledOrderDetailPage>
  );
}

export default OrderDetailPage;
