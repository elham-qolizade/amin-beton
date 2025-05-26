// components/BillsOfLadingWindow.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import MapComponent from "../../ui/MapComponent"; // نقشه مقصد
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

  const fetchBills = async () => {
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

      if (!response.ok) throw new Error("خطا در دریافت بارنامه‌ها");
      const data = await response.json();
      setBills(data);
    } catch (err) {
      console.error("❌", err);
      alert("خطا در دریافت اطلاعات بارنامه");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [orderId]);

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
            {bill.destination_lat && bill.destination_lng && (
              <MapComponent
                lat={bill.destination_lat}
                lng={bill.destination_lng}
              />
            )}
            {/* دکمه حذف و ویرایش هم می‌تونه اینجا اضافه بشه */}
          </BillCard>
        ))
      )}
    </Container>
  );
}

export default BillsOfLadingWindow;
