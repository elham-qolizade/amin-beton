import PropTypes from "prop-types";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
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

const InvoiceCard = styled.div`
  background-color: #f9f9f9;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const StatusText = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-800);
`;

const PriceText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-green-600);
`;

const CreatedAtText = styled.p`
  font-size: 1rem;
  color: var(--color-grey-600);
`;

const InvoiceLink = styled.a`
  color: var(--color-blue-600);
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    color: var(--color-blue-800);
  }
`;

const DenyReason = styled.p`
  font-size: 1rem;
  color: var(--color-red-600);
  font-weight: bold;
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

const statusMap = {
  1: "ارسال شده",
  2: "تایید شده",
  3: "رد شده",
};

function InvoicesListWithForm({ orderDetails }) {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = useCallback(async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      const response = await fetch(
        "http://amin-beton-back.chbk.app/api/orders//",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id: orderDetails.id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setInvoices([data]); // اگر فقط یک فاکتور برمی‌گردد
      } else {
        const errorText = await response.text();
        console.error("خطا در دریافت فاکتور:", errorText);
      }
    } catch (error) {
      console.error("استثنا در دریافت فاکتور:", error);
    }
  }, [orderDetails.id]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const [file, setFile] = useState(null);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    if (!price) {
      alert("لطفا مبلغ پیش فاکتور را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      if (!token) {
        alert("توکن دسترسی یافت نشد");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("order", orderDetails.id);
      formData.append("price", parseInt(price));
      formData.append("is_paid", false);
      if (file) {
        formData.append("invoice_file", file);
      }

      const response = await fetch(
        "http://amin-beton-back.chbk.app/api/invoice-management/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 201) {
        alert("پیش فاکتور با موفقیت ایجاد شد!");
        setPrice("");
        setFile(null);
        fetchInvoices(); // بروزرسانی لیست
      } else {
        const errorText = await response.text();
        console.error("پاسخ سرور:", errorText);
        alert("مشکلی پیش آمد، دوباره تلاش کنید!");
      }
    } catch (error) {
      console.error("خطا در ارسال فاکتور:", error);
      alert("خطا در ارسال فاکتور");
    } finally {
      setLoading(false);
    }
  };

  // const hasConfirmedInvoice = invoices.some((invoice) => invoice.status === 2);
  return (
    <Wrapper>
      <Title>پیش فاکتورهای سفارش</Title>

      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <InvoiceCard key={invoice.id}>
            <StatusText>
              وضعیت: {statusMap[invoice.status] ?? "نامشخص"}
            </StatusText>
            <PriceText>قیمت: {invoice.price} تومان</PriceText>
            <CreatedAtText>تاریخ ایجاد: {invoice.created_at}</CreatedAtText>
            {invoice.invoice_file ? (
              <p>
                فایل پیش فاکتور:{" "}
                <InvoiceLink
                  href={invoice.invoice_file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  دانلود
                </InvoiceLink>
              </p>
            ) : (
              <p>پیش فاکتور موجود نیست.</p>
            )}
            {invoice.status === 3 && invoice.deny_reason && (
              <DenyReason>دلیل رد شدن: {invoice.deny_reason}</DenyReason>
            )}
          </InvoiceCard>
        ))
      ) : (
        <>
          <p>هیچ پیش‌فاکتوری ثبت نشده است.</p>

          <FormWrapper
            onSubmit={handleCreateInvoice}
            encType="multipart/form-data"
          >
            <Title>ایجاد پیش‌فاکتور جدید</Title>

            <label>قیمت پیش‌فاکتور (تومان):</label>
            <InputField
              type="number"
              placeholder="مثلاً 1000000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>آپلود فایل پیش‌فاکتور:</label>
            <InputField
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "در حال ارسال..." : "ایجاد پیش‌فاکتور"}
            </SubmitButton>
          </FormWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default InvoicesListWithForm;
