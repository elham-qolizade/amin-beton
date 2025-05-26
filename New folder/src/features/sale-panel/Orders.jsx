import ConfirmedOrders from "./ConfirmedOrders";
import WaitingOrders from "./WaitingOrders";

function Orders() {
  return (
    <>
      <WaitingOrders />
      <ConfirmedOrders />
    </>
  );
}

export default Orders;
