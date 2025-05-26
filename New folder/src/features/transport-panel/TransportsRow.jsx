/*eslint-disable */
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Table from "../../ui/Table";

function TransportsRow({ transport }) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Button
        size="small"
        variation="primary"
        onClick={() => navigate(`/transport-panel/transports/${transport.id}`)}
      >
        وضعیت مرسوله ها
      </Button>

      <div>{transport.customer_id}</div>
      <div>{transport.project_name}</div>
      <div>{transport.product_name}</div>
      <div>{transport.order_id}</div>
    </Table.Row>
  );
}

export default TransportsRow;
