import styled from "styled-components";
import { useEffect, useState } from "react";
import AddNote from "./AddNote";

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
        <AddNote
          orderId={orderId}
          panel={panel}
          onCloseModal={() => setShowAddNote(false)}
          onConfirm={handleNoteAdded}
        />
      )}
    </StyledOrderNotes>
  );
}

export default OrderNotesWrapper;
