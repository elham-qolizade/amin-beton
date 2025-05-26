/*eslint-disable */
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Table from "../../ui/Table";

function LabListItem({ listItem }) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Button
        size="small"
        variation="primary"
        onClick={() => navigate(`/lab-panel/list/films/${listItem.id}`)}
      >
        لیست فایل ها
      </Button>

      <div>{listItem.project.user_id}</div>
      <div>{listItem.project.title}</div>
      <div>{listItem.order_name}</div>
      <div>{listItem.order_id}</div>
    </Table.Row>
  );
}

export default LabListItem;
