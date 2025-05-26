import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
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
  const [error, setError] = useState("");

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInvoice(null);

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
        {
          order_id: orderId,
        }
      );

      if (response.status === 200) {
        setInvoice(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("فاکتوری برای این سفارش یافت نشد.");
      } else {
        setError("خطایی در ارتباط با سرور رخ داد.");
      }
    }

    setLoading(false);
  };

  return (
    <Wrapper>
      <Title>دریافت فاکتور سفارش</Title>
      <FormWrapper onSubmit={handleCreateInvoice}>
        <label>شناسه سفارش (order_id):</label>
        <InputField
          type="text"
          placeholder="مثلاً 123"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "در حال دریافت..." : "دریافت فاکتور"}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {invoice && (
          <InvoiceBox>
            <p>✅ فاکتور دریافت شد:</p>
            <pre>{JSON.stringify(invoice, null, 2)}</pre>
          </InvoiceBox>
        )}
      </FormWrapper>
    </Wrapper>
  );
}

export default InvoicesListWithForm;
