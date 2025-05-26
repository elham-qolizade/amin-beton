/*eslint-disable */
import { useParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import OrderPageHeader from "../../features/user-panel/OrderPageHeader";
import OrderItem from "../../features/user-panel/OrderItem";

import { useOrders } from "../../features/user-panel/useOrders";
import { useProject } from "../../features/user-panel/useProject";

function OrdersPage() {
  const { projectId } = useParams(); // type of String
  const { project, isLoadingProject } = useProject(projectId);
  const { orders, isLoadingOrders } = useOrders();

  if (isLoadingOrders || isLoadingProject) return <Spinner />;

  let selectedOrders;
  let ongoingOrders;
  if (!isLoadingOrders) {
    selectedOrders = orders.filter(
      (order) => order.project_id === Number(projectId)
    );

    ongoingOrders = selectedOrders.filter((order) => order.step !== "finished");
  }

  return (
    <div>
      {/* Title , Stats and Links */}
      <OrderPageHeader orders={selectedOrders} project={project} />

      {/* Orders List */}
      {ongoingOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrdersPage;
