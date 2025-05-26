import styled from "styled-components";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const StyledAddNote = styled.div`
  h3 {
    margin-bottom: 3rem;
  }

  li {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  .note-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .panel-label {
    font-weight: bold;
    color: #555;
  }

  .note-date {
    font-size: 0.85rem;
    color: #888;
  }
`;

const panelLabels = {
  sales: "فروش",
  financial: "مالی",
  execution: "اجرا",
};

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
        const tokenData = JSON.parse(localStorage.getItem("token"));
        const token = tokenData?.access;

        if (!token) {
          console.error("No access token found");
          return;
        }

        const response = await fetch(
          "https://amin-beton-back.chbk.app/api/order-management/get-order-notes/",
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
          console.error("Response Error:", errorText);
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
    <StyledAddNote>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div className="note-header">
              <span className="panel-label">
                {panelLabels[note.panel] || note.panel}
              </span>
              <span className="note-date">
                {new Date(note.created_at).toLocaleString("fa-IR")}
              </span>
            </div>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </StyledAddNote>
  );
}

export default OrderNotes;
