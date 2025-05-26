import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledOrderNotes = styled.div`
  h3 {
    margin-bottom: 3rem;
  }

  ul {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 2rem;
    padding-right: 1rem;
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

  .add-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .submit-button {
    background-color: #28a745;
    color: white;
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;
  }
`;

const panelLabels = {
  sales: "فروش",
  financial: "مالی",
  execution: "اجرا",
};

function OrderNotesWrapper({ orderId, panel }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddNote, setShowAddNote] = useState(false);

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

  // حالا داخل همین کامپوننت فرم یادداشت جدید رو تعریف می‌کنیم
  function AddNoteForm({ onCancel, onSuccess }) {
    const [noteText, setNoteText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!noteText.trim()) {
        setError("متن یادداشت نمی‌تواند خالی باشد");
        return;
      }
      setLoading(true);
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
              order: orderId,
              panel: panel, // مثلاً "execution" یا "financial"
              text: noteText.trim(),
            }),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(
            errData.text ? errData.text.join(", ") : "خطا در ثبت یادداشت"
          );
        }

        onSuccess();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="متن یادداشت را وارد کنید"
          rows={5}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "در حال ارسال..." : "ثبت یادداشت"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            لغو
          </button>
        </div>
      </form>
    );
  }

  const handleNoteAdded = () => {
    setShowAddNote(false);
    fetchNotes();
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <StyledOrderNotes>
      {!showAddNote && (
        <>
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

          <button className="add-button" onClick={() => setShowAddNote(true)}>
            افزودن یادداشت
          </button>
        </>
      )}

      {showAddNote && (
        <AddNoteForm
          onCancel={() => setShowAddNote(false)}
          onSuccess={handleNoteAdded}
        />
      )}
    </StyledOrderNotes>
  );
}

export default OrderNotesWrapper;
