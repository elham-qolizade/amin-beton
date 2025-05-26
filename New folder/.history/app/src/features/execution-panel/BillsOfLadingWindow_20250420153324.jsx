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
const EditButton = styled.button`
  background: orange;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: darkorange;
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
// ...import ها و سایر کدها در بالای فایل باقی بمونه

const BillsOfLadingWindow = ({ orderId }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [imei, setImei] = useState("");
  const [plate2, setPlate2] = useState("");
  const [plateAlpha, setPlateAlpha] = useState("");
  const [plate3, setPlate3] = useState("");
  const [plateIran, setPlateIran] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [emptyWeight, setEmptyWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [editingBill, setEditingBill] = useState(null);

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

  useEffect(() => {
    if (editingBill) {
      setDriverName(editingBill.driver_name);
      setDriverMobile(editingBill.driver_mobile);
      setImei(editingBill.IMEI);
      setPlate2(editingBill.plate_number_2);
      setPlateAlpha(editingBill.plate_number_alphabet);
      setPlate3(editingBill.plate_number_3);
      setPlateIran(editingBill.plate_number_iran);
      setTotalWeight(editingBill.total_weight);
      setEmptyWeight(editingBill.empty_weight);
      setNetWeight(editingBill.net_weight);
      setShowForm(true);
    }
  }, [editingBill]);

  const clearForm = () => {
    setDriverName("");
    setDriverMobile("");
    setImei("");
    setPlate2("");
    setPlateAlpha("");
    setPlate3("");
    setPlateIran("");
    setTotalWeight("");
    setEmptyWeight("");
    setNetWeight("");
    setEditingBill(null);
    setShowForm(false);
  };

  const handleAddBill = async (e) => {
    e.preventDefault();

    if (
      !driverName ||
      !driverMobile ||
      !imei ||
      !plate2 ||
      !plateAlpha ||
      !plate3 ||
      !plateIran ||
      !totalWeight ||
      !emptyWeight ||
      !netWeight
    ) {
      return alert("تمام فیلدها باید پر شوند.");
    }

    try {
      const res = await fetch(
        editingBill
          ? `http://amin-beton-back.chbk.app/api/bills-of-lading-management/${editingBill.id}/`
          : `http://amin-beton-back.chbk.app/api/bills-of-lading-management/`,
        {
          method: editingBill ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order: orderId,
            IMEI: imei,
            driver_name: driverName,
            driver_mobile: driverMobile,
            plate_number_2: plate2,
            plate_number_alphabet: plateAlpha,
            plate_number_3: plate3,
            plate_number_iran: plateIran,
            total_weight: totalWeight,
            empty_weight: emptyWeight,
            net_weight: netWeight,
          }),
        }
      );

      if (!res.ok) throw new Error(await res.text());

      clearForm();
      fetchBills();
    } catch (err) {
      console.error("❌", err);
      alert("خطا در ثبت یا ویرایش بارنامه");
    }
  };

  const handleDelete = async (billId) => {
    if (!window.confirm("از حذف مطمئنی؟")) return;

    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/bills-of-lading-management/${billId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        {showForm ? "لغو" : "➕ افزودن بارنامه"}
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

          <select
            value={plateAlpha}
            onChange={(e) => setPlateAlpha(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            <option value="">انتخاب حرف پلاک</option>
            {[
              "الف",
              "ب",
              "پ",
              "ت",
              "ث",
              "ج",
              "چ",
              "ح",
              "خ",
              "د",
              "ذ",
              "ر",
              "ز",
              "ژ",
              "س",
              "ش",
              "ص",
              "ض",
              "ط",
              "ظ",
              "ع",
              "غ",
              "ف",
              "ق",
              "ک",
              "گ",
              "ل",
              "م",
              "ن",
              "و",
              "ه",
              "ی",
            ].map((label, idx) => (
              <option key={idx} value={label}>
                {label}
              </option>
            ))}
          </select>

          <Input
            placeholder="پلاک - سه رقمی"
            value={plate3}
            onChange={(e) => setPlate3(e.target.value)}
          />
          <Input
            placeholder="ایران (دو رقم آخر)"
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
          <Button type="submit">
            {editingBill ? "ویرایش بارنامه" : "ثبت بارنامه"}
          </Button>
          {editingBill && (
            <Button type="button" onClick={clearForm}>
              لغو ویرایش
            </Button>
          )}
        </Form>
      )}

      {bills.length === 0 ? (
        <p>هیچ بارنامه‌ای ثبت نشده است.</p>
      ) : (
        bills.map((bill) => (
          <BillCard key={bill.id}>
            <EditButton onClick={() => setEditingBill(bill)}>✏️</EditButton>
            <DeleteButton onClick={() => handleDelete(bill.id)}>
              🗑️
            </DeleteButton>
            <div className="flex flex-col gap-4">
              <p>
                وضعیت: <b>{bill.bill_of_lading_status}</b>
              </p>
              <p>بارنامه: {bill.bill_of_lading_id}</p>
              <p>تاریخ: {bill.create_at}</p>
              <p>
                راننده: {bill.driver_name} | {bill.driver_mobile}
              </p>
              <p>IMEI: {bill.IMEI}</p>
              <p>
                پلاک: {bill.plate_number_2} {bill.plate_number_alphabet}{" "}
                {bill.plate_number_3} - {bill.plate_number_iran}
              </p>
              <p>
                وزن پر: {bill.total_weight} | خالی: {bill.empty_weight} | خالص:{" "}
                {bill.net_weight}
              </p>
            </div>
          </BillCard>
        ))
      )}
    </Container>
  );
};

BillsOfLadingWindow.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BillsOfLadingWindow;
