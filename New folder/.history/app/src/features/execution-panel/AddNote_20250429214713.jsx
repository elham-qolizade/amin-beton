/*eslint-disable */
import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
// import AddNote from "./AddNote";
const StyledAddNote = styled.div`
  h3 {
    margin-bottom: 3rem;
  }
`;

function OrderNotes({ orderId }) {
  const { notes, loading } = useOrderNotes(orderId);

  if (loading) return <p>در حال بارگذاری یادداشت‌ها...</p>;
  if (notes.length === 0) return <p>یادداشتی برای این سفارش ثبت نشده است.</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <p>{note.text}</p>
          <small>{new Date(note.created_at).toLocaleString("fa-IR")}</small>
        </li>
      ))}
    </ul>
  );
}

export default AddNote;
