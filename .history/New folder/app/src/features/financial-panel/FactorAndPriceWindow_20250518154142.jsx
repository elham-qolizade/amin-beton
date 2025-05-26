import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-dark);
  margin-bottom: 1rem;
`;

const InvoiceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const InvoiceItem = styled.li`
  background-color: #e8ffe8;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #00b300;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormWrapper = styled.form`
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 3rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-800);
  }

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

const AddButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-800);
  }
`;

function FinalInvoiceSection({ orderDetails }) {
  const [loading, setLoading] = useState(true);
  const [factor, setFactor] = useState(null);
  const [price, setPrice] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);

  const orderId = orderDetails.id;

  const fetchFactor = async () => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData?.access;

    if (!token) {
      alert("توکن دسترسی یافت نشد");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://amin-beton-back.chbk.app/api/orders/get-order-factor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setFactor(data);
        setInvoiceList([data]);
        setShowForm(false);
      } else if (response.status === 404) {
        setShowForm(false);
        setInvoiceList([]);
      }
    } catch (error) {
      console.error("خطا در دریافت فاکتور:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleCreateFactor = async (e) => {
    e.preventDefault();

    if (!price || Number(price) <= 0) {
      alert("لطفاً یک قیمت معتبر وارد کنید");
      return;
    }

    if (!fileLink) {
      alert("لطفاً فایل فاکتور را بارگذاری کنید");
      return;
    }

    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData?.access;

    if (!token) {
      alert("توکن دسترسی یافت نشد");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("price", price);
    formData.append("factor", fileLink);
    formData.append("order", orderId);

    try {
      const response = await fetch(
        "https://amin-beton-back.chbk.app/api/order-management/add-factor/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 201) {
        alert("فاکتور با موفقیت ثبت شد ✅");
        setPrice("");
        setFileLink("");
        setShowForm(false);
        await fetchFactor();
      } else if (response.status === 400) {
        alert("این سفارش قبلاً فاکتور دارد");
      } else {
        const errorText = await response.text();
        console.error("خطا در ایجاد فاکتور:", errorText);
        alert("مشکلی در ایجاد فاکتور پیش آمد.");
      }
    } catch (error) {
      console.error("خطا در ارسال فاکتور:", error);
      alert("خطای شبکه هنگام ارسال فاکتور.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Title>فاکتور نهایی سفارش</Title>

      {loading && <p>در حال دریافت اطلاعات...</p>}

      {!loading && invoiceList.length > 0 && (
        <InvoiceList>
          {invoiceList.map((inv) => (
            <InvoiceItem key={inv.id}>
              <span>💰 قیمت: {inv.price.toLocaleString()} تومان</span>
              <a href={inv.factor} target="_blank" rel="noopener noreferrer">
                دانلود فاکتور
              </a>
            </InvoiceItem>
          ))}
        </InvoiceList>
      )}

      {!loading && !showForm && (
        <AddButton onClick={() => setShowForm(true)}>افزودن فاکتور</AddButton>
      )}

      {showForm && (
        <FormWrapper onSubmit={handleCreateFactor}>
          <label>قیمت فاکتور:</label>
          <InputField
            type="number"
            value={price}
            placeholder="مثلاً 2000000"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>فایل فاکتور:</label>
          <InputField
            type="file"
            onChange={(e) => setFileLink(e.target.files[0])}
          />
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? "در حال ارسال..." : "ایجاد فاکتور"}
          </SubmitButton>
        </FormWrapper>
      )}
    </Wrapper>
  );
}

FinalInvoiceSection.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FinalInvoiceSection;
