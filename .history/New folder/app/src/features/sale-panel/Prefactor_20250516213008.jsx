import { useState } from "react";
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
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState(orderDetails.invoices || []);
  const hasConfirmedInvoice = invoices.some((invoice) => invoice.status === 2);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    if (!price) {
      alert("لطفا مبلغ پیش فاکتور را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("order", orderDetails.id);
      formData.append("price", parseInt(price)); // 👈 مهم
      formData.append("is_paid", false); // 👈 احتمالاً اجباریه

      if (invoiceFile) {
        formData.append("invoice_file", invoiceFile);
      }
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      const response = await fetch(
        `http://amin-beton-back.chbk.app/api/invoice-management/?order=${orderDetails.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("پیش فاکتور با موفقیت ایجاد شد!");
        setInvoices((prev) => [...prev, data]);
        setPrice("");
        setInvoiceFile(null);
      } else {
        const errorText = await response.text();
        console.error("خطای اعتبارسنجی:", errorText); // 👈 خطا رو بررسی کن
        alert("خطای اعتبارسنجی: " + errorText);
      }
    } catch (error) {
      console.error("خطا در ارسال فاکتور:", error);
      alert("خطا در ارسال فاکتور");
    } finally {
      setLoading(false);
    }
  };

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
        <p>هیچ پیش‌فاکتوری ثبت نشده است.</p>
      )}

      {!hasConfirmedInvoice && (
        <FormWrapper onSubmit={handleCreateInvoice}>
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
            onChange={(e) => setInvoiceFile(e.target.files[0])}
          />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "در حال ارسال..." : "ایجاد پیش‌فاکتور"}
          </SubmitButton>
        </FormWrapper>
      )}
    </Wrapper>
  );
}

InvoicesListWithForm.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    invoices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
        invoice_file: PropTypes.string,
        deny_reason: PropTypes.string,
        created_at: PropTypes.string,
        price: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default InvoicesListWithForm;
