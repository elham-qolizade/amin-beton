/*eslint-disable */
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledAddNote = styled.div`
  h3 {
    margin-bottom: 3rem;
  }
`;

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
        const token = localStorage.getItem("accessToken");
        console.log("توکن:", token); // بررسی توکن

        const response = await fetch(
          "https://amin-beton-back.chbk.app/order-management/get-order-notes/", // بدون /api
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order_id: orderId }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response Error:", errorText); // برای لاگ بهتر
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
