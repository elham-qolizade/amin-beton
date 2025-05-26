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
  background-color: #e8ffe8;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  border: 1px solid #00b300;
`;

function FinalInvoiceSection({ orderId }) {
  const [loading, setLoading] = useState(true);
  const [factor, setFactor] = useState(null);
  const [price, setPrice] = useState("");
  const [fileLink, setFileLink] = useState("");

  useEffect(() => {
    const fetchFactor = async () => {
      try {
        const response = await fetch(
          "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: orderId }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setFactor(data);
        }
      } catch (error) {
        console.error("خطا در دریافت فاکتور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactor();
  }, [orderId]);

  const handleCreateFactor = async (e) => {
    e.preventDefault();
    if (!price) return alert("قیمت را وارد کنید");

    try {
      const res = await fetch(
        "https://amin-beton-back.chbk.app/api/invoice-management/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order: orderId,
            price: Number(price),
            invoice_file: fileLink,
          }),
        }
      );

      if (res.ok) {
        alert("فاکتور نهایی ایجاد شد!");
        const newFactor = await res.json();
        setFactor(newFactor);
      } else {
        alert("خطا در ایجاد فاکتور");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ایجاد فاکتور");
    }
  };

  return (
    <Wrapper>
      <Title>فاکتور نهایی سفارش</Title>

      {loading && <p>در حال دریافت اطلاعات...</p>}

      {!loading && factor ? (
        <InvoiceBox>
          <p>💰 قیمت: {factor.price} تومان</p>
          <p>🧾 شماره فاکتور: {factor.id}</p>
          <p>
            📎 فایل فاکتور:{" "}
            <a href={factor.factor} target="_blank" rel="noopener noreferrer">
              دانلود
            </a>
          </p>
        </InvoiceBox>
      ) : (
        !loading && (
          <FormWrapper onSubmit={handleCreateFactor}>
            <label>قیمت فاکتور:</label>
            <InputField
              type="number"
              value={price}
              placeholder="مثلاً 2000000"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>لینک فایل فاکتور:</label>
            <InputField
              type="text"
              value={fileLink}
              placeholder="مثلاً https://example.com/factor.pdf"
              onChange={(e) => setFileLink(e.target.value)}
            />
            <SubmitButton type="submit">ایجاد فاکتور</SubmitButton>
          </FormWrapper>
        )
      )}
    </Wrapper>
  );
}

FinalInvoiceSection.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default FinalInvoiceSection;
