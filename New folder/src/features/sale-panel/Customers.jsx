import WaitingCustomers from "./WaitingCustomers";
import ConfirmedCustomers from "./ConfirmedCustomers";

function Customers() {
  return (
    <>
      <WaitingCustomers />
      <ConfirmedCustomers />
    </>
  );
}

export default Customers;
