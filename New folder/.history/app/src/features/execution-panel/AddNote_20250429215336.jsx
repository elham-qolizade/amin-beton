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

import { useEffect, useState } from "react";

function OrderNotes({ orderId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://amin-beton-back.chbk.app/api/order-management/get-order-notes/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_id: orderId }),
          }
        );

        if (!response.ok) {
          throw new Error("خطا در دریافت یادداشت‌ها");
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [orderId]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;
  if (notes.length === 0) return <p>یادداشتی ثبت نشده است.</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li
          key={note.id}
          style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}
        >
          <p>{note.text}</p>
          <small>{new Date(note.created_at).toLocaleString("fa-IR")}</small>
        </li>
      ))}
    </ul>
  );
}

export default OrderNotes;
