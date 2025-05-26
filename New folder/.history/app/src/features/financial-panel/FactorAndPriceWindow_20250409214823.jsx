import { useState } from "react";
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

const InvoiceBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #e8ffe8;
  border: 1px solid #00b300;
  border-radius: 6px;
`;

function InvoicesListWithForm() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [price, setPrice] = useState("");
  const [invoiceFile, setInvoiceFile] = useState("");

  const handleCheckInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInvoice(null);
    setNotFound(false);

    try {
      const res = await fetch(
        "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setInvoice(data);
      } else if (res.status === 404) {
        setNotFound(true);
      } else {
        alert("خطایی در دریافت اطلاعات رخ داد.");
      }
    } catch (err) {
      alert("خطا در اتصال به سرور.");
    }

    setLoading(false);
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    console.log("ایجاد فاکتور با قیمت:", price, "و فایل:", invoiceFile);
    // اینجا می‌تونی بعداً API مربوط به ایجاد فاکتور رو هم اضافه کنی
  };

  return (
    <Wrapper>
      <Title>استعلام فاکتور سفارش</Title>
      <FormWrapper onSubmit={handleCheckInvoice}>
        <label>شناسه سفارش (order_id):</label>
        <InputField
          type="text"
          placeholder="مثلاً 123"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "در حال بررسی..." : "بررسی فاکتور"}
        </SubmitButton>
      </FormWrapper>

      {invoice && (
        <InvoiceBox>
          <p>✅ فاکتور موجود است:</p>
          <p>
            <strong>شناسه:</strong> {invoice.id}
          </p>
          <p>
            <strong>قیمت:</strong> {invoice.price.toLocaleString()} تومان
          </p>
          <p>
            <strong>لینک فاکتور:</strong>{" "}
            <a href={invoice.factor} target="_blank" rel="noopener noreferrer">
              مشاهده فایل
            </a>
          </p>
        </InvoiceBox>
      )}

      {notFound && (
        <FormWrapper onSubmit={handleCreateInvoice}>
          <h3>فاکتور یافت نشد، لطفاً اطلاعات جدید وارد کنید:</h3>
          <label>قیمت فاکتور (تومان):</label>
          <InputField
            type="number"
            placeholder="مثلاً 1000000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>لینک فایل فاکتور:</label>
          <InputField
            type="text"
            placeholder="https://example.com/invoice.pdf"
            value={invoiceFile}
            onChange={(e) => setInvoiceFile(e.target.value)}
          />
          <SubmitButton type="submit">ایجاد فاکتور</SubmitButton>
        </FormWrapper>
      )}
    </Wrapper>
  );
}

export default InvoicesListWithForm;
