import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  position: relative;
`;

const Button = styled.button`
  background-color: var(--color-brand-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #c0392b;
  }
`;

const Form = styled.form`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px dashed var(--color-grey-400);
  border-radius: 1rem;
  background: #f1f1f1;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-grey-300);
  border-radius: 0.5rem;
`;
function BillsOfLadingWindow({ orderId }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [plate, setPlate] = useState("");

  const token = JSON.parse(localStorage.getItem("token"))?.access;

  const fetchBills = useCallback(async () => {
    if (!token) return alert("دسترسی غیرمجاز.");
    setLoading(true);
    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/${orderId}/get-bills-of-lading/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("❌", err);
      alert("خطا در دریافت بارنامه‌ها");
    } finally {
      setLoading(false);
    }
  }, [orderId, token]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const handleAddBill = async (e) => {
    e.preventDefault();
    if (!driverName || !plate) return alert("تمام فیلدها را پر کنید.");

    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/${orderId}/create-bill-of-lading/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ driver_name: driverName, plate }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setDriverName("");
      setPlate("");
      setShowForm(false);
      fetchBills();
    } catch (err) {
      console.error("❌", err);
      alert("خطا در افزودن بارنامه");
    }
  };

  const handleDelete = async (billId) => {
    if (!window.confirm("از حذف مطمئنی؟")) return;
    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/delete-bill-of-lading/${billId}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(await res.text());
      fetchBills();
    } catch (err) {
      console.error("❌", err);
      alert("خطا در حذف بارنامه");
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      <h2>📦 بارنامه‌های سفارش شماره {orderId}</h2>

      <Button onClick={() => setShowForm((s) => !s)}>
        {showForm ? "لغو افزودن" : "➕ افزودن بارنامه"}
      </Button>

      {showForm && (
        <Form onSubmit={handleAddBill}>
          <Input
            placeholder="نام راننده"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <Input
            placeholder="شماره موبایل راننده"
            value={driverMobile}
            onChange={(e) => setDriverMobile(e.target.value)}
          />
          <Input
            placeholder="IMEI دستگاه"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <Input
            placeholder="پلاک - دو رقمی"
            value={plate2}
            onChange={(e) => setPlate2(e.target.value)}
          />
          <Input
            placeholder="حرف پلاک (مثلاً 33)"
            value={plateAlpha}
            onChange={(e) => setPlateAlpha(e.target.value)}
          />
          <Input
            placeholder="پلاک - سه رقمی"
            value={plate3}
            onChange={(e) => setPlate3(e.target.value)}
          />
          <Input
            placeholder="ایران"
            value={plateIran}
            onChange={(e) => setPlateIran(e.target.value)}
          />
          <Input
            placeholder="وزن پر (kg)"
            value={totalWeight}
            onChange={(e) => setTotalWeight(e.target.value)}
          />
          <Input
            placeholder="وزن خالی (kg)"
            value={emptyWeight}
            onChange={(e) => setEmptyWeight(e.target.value)}
          />
          <Input
            placeholder="وزن خالص (kg)"
            value={netWeight}
            onChange={(e) => setNetWeight(e.target.value)}
          />
          <Button type="submit">ثبت بارنامه</Button>
        </Form>
      )}

      {bills.length === 0 ? (
        <p>هیچ بارنامه‌ای ثبت نشده است.</p>
      ) : (
        bills.map((bill) => (
          <BillCard key={bill.id}>
            <DeleteButton onClick={() => handleDelete(bill.id)}>
              🗑️
            </DeleteButton>

            <div className="flex flex-col items-start justify-between gap-6 bg-white md:flex-row md:items-start p-4 rounded-md">
              {/* اطلاعات بارنامه (راست) */}
              <div className="flex flex-col w-full gap-4 md:w-1/2 text-sm">
                <p className="text-yellow-600 font-bold">
                  وضعیت:{" "}
                  <span className="font-normal">
                    {bill.bill_of_lading_status}
                  </span>
                </p>
                <p>
                  شماره بارنامه:{" "}
                  <span className="font-medium">{bill.bill_of_lading_id}</span>
                </p>
                <p>
                  تاریخ ایجاد:{" "}
                  <span className="font-medium">{bill.create_at}</span>
                </p>
                <p>
                  نام راننده:{" "}
                  <span className="font-medium">{bill.driver_name}</span>
                </p>
                <p>
                  شماره موبایل راننده:{" "}
                  <span className="font-medium">{bill.driver_mobile}</span>
                </p>
                <p>
                  IMEI دستگاه: <span className="font-medium">{bill.IMEI}</span>
                </p>
                <p>
                  شماره پلاک:{" "}
                  <span className="font-medium">
                    {bill.plate_number_2} {bill.plate_number_alphabet}{" "}
                    {bill.plate_number_3} - {bill.plate_number_iran}
                  </span>
                </p>
              </div>

              {/* اطلاعات وزن (چپ) */}
              <div className="flex flex-col w-full gap-2 text-sm md:w-1/2">
                <p>
                  وزن پر:{" "}
                  <span className="font-medium">
                    {bill.total_weight} کیلوگرم
                  </span>
                </p>
                <p>
                  وزن خالی:{" "}
                  <span className="font-medium">
                    {bill.empty_weight} کیلوگرم
                  </span>
                </p>
                <p>
                  وزن خالص:{" "}
                  <span className="font-medium">{bill.net_weight} کیلوگرم</span>
                </p>
              </div>
            </div>
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
