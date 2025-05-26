// components/BillsOfLadingWindow.jsx
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import MapComponent from "../../ui/MapComponent";
import Spinner from "../../ui/Spinner";

const Container = styled.div`
  padding: 2rem;
  max-height: 80vh;
  overflow-y: auto;
`;

const BillCard = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  background: #f9f9f9;
`;

function BillsOfLadingWindow({ orderId }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"))?.access;

  const fetchBills = useCallback(async () => {
    if (!token) {
      alert("دسترسی غیرمجاز. لطفاً دوباره وارد شوید.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/bills-of-lading/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(errMessage || "خطا در دریافت بارنامه‌ها");
      }

      const data = await response.json();
      setBills(data);
    } catch (err) {
      console.error("❌", err);
      alert(`خطا در دریافت اطلاعات بارنامه: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [orderId, token]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  if (loading) return <Spinner />;

  return (
    <Container>
      <h2>📦 بارنامه‌های سفارش شماره {orderId}</h2>

      {bills.length === 0 ? (
        <p>هیچ بارنامه‌ای ثبت نشده است.</p>
      ) : (
        bills.map((bill) => (
          <BillCard key={bill.id}>
            <p>👷 راننده: {bill.driver_name}</p>
            <p>🚛 پلاک: {bill.plate}</p>
            {Number.isFinite(bill.destination_lat) &&
              Number.isFinite(bill.destination_lng) && (
                <MapComponent
                  lat={bill.destination_lat}
                  lng={bill.destination_lng}
                />
              )}
            {/* <button>✏️ ویرایش</button>
            <button>🗑️ حذف</button> */}
          </BillCard>
        ))
      )}
    </Container>
  );
}

BillsOfLadingWindow.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BillsOfLadingWindow;
