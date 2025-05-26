import styled from "styled-components";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const StyledAddNote = styled.div`
  h3 {
    margin-bottom: 3rem;
  }

  ul {
    max-height: 300px; /* ارتفاع مورد نظر */
    overflow-y: auto;
    margin-bottom: 2rem;
    padding-right: 1rem; /* برای جای اسکرول */
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

  form {
    margin-top: 2rem;

    textarea {
      width: 100%;
      min-height: 80px;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
    }
  }
`;

const panelLabels = {
  sales: "فروش",
  financial: "مالی",
  execution: "اجرا",
};

function OrderNotes({ orderId, panel, showForm = false }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      if (!token) throw new Error("توکن یافت نشد");

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

      if (!response.ok) throw new Error("خطا در دریافت یادداشت‌ها");

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message || "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchNotes();
  }, [orderId]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      if (!token) throw new Error("توکن یافت نشد");

      const response = await fetch(
        "https://amin-beton-back.chbk.app/api/order-management/add-note/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id: orderId,
            text: newNote.trim(),
            panel, // پنل ثابت مثل 'sales'
          }),
        }
      );

      if (!response.ok) throw new Error("خطا در ارسال یادداشت");

      setNewNote("");
      fetchNotes(); // رفرش لیست
    } catch (err) {
      setError(err.message || "خطای ارسال یادداشت");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <StyledAddNote>
      <ul>
        {notes.length === 0 ? (
          <p>یادداشتی ثبت نشده است.</p>
        ) : (
          notes.map((note) => (
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
          ))
        )}
      </ul>

      {showForm && (
        <form onSubmit={handleAddNote}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="یادداشت خود را وارد کنید..."
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "در حال ارسال..." : "افزودن یادداشت"}
          </button>
        </form>
      )}
    </StyledAddNote>
  );
}

OrderNotes.propTypes = {
  orderId: PropTypes.number.isRequired,
  panel: PropTypes.oneOf(["sales", "financial", "execution"]).isRequired,
  showForm: PropTypes.bool,
};

export default OrderNotes;
