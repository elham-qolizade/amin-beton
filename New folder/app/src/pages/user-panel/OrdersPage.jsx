// /*eslint-disable */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import OrderPageHeader from "../../features/user-panel/OrderPageHeader";
import OrderItem from "../../features/user-panel/OrderItem";
import Button from "../../ui/Button";

import { useProjectOrders } from "../../features/user-panel/useOrders";

const StyledOrdersPage = styled.div`
  .back-button {
    margin-bottom: 3rem;
  }

  .empty {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--color-red-600);
    text-align: center;
    margin-top: 10rem;
  }
`;

function OrdersPage() {
  const navigate = useNavigate();
  const { projectId } = useParams(); // type of String
  const { isLoadingProjectOrders, getProjectOrders, projectOrders } =
    useProjectOrders();

  useEffect(() => {
    getProjectOrders(projectId);
  }, [getProjectOrders, projectId]);

  if (isLoadingProjectOrders) return <Spinner />;
  // console.log("projectOrders from ordersPage : ", projectOrders);

  return (
    <StyledOrdersPage>
      <Button
        className="back-button"
        variation="continue"
        onClick={() => navigate("/user-panel/projects")}
      >
        بازکشت به صفحه پروژه ها
      </Button>

      {projectOrders ? (
        <>
          {/* Title , Stats and Links */}
          <OrderPageHeader orders={projectOrders} />

          {/* Orders List */}
          {projectOrders.length > 0 ? (
            projectOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))
          ) : (
            <div className="empty">
              برای این پروژه سفارشی ثبت نکرده اید.
              <br />
              برای ثبت سفارش، می‌توانید وارد صفحه خرید از بالای همین صفحه شوید.
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </StyledOrdersPage>
  );
}

export default OrdersPage;
