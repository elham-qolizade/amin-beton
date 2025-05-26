import { useState } from "react";
// import PropTypes from "prop-types";
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

function InvoicesListWithForm() {
  const [price, setPrice] = useState("");
  const [invoiceFile, setInvoiceFile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    setLoading(true);

    // اینجا کد ارسال فرم یا کاری که باید انجام بشه قرار میگیره
    console.log("ایجاد فاکتور با قیمت:", price, "و فایل:", invoiceFile);

    // بعد از انجام عملیات، می‌توان وضعیت بارگذاری را به false برگرداند
    setLoading(false);
  };

  return (
    <Wrapper>
      <Title>ایجاد فاکتور جدید</Title>
      <FormWrapper onSubmit={handleCreateInvoice}>
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
          placeholder="لینک فایل فاکتور"
          value={invoiceFile}
          onChange={(e) => setInvoiceFile(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ایجاد فاکتور"}
        </SubmitButton>
      </FormWrapper>
    </Wrapper>
  );
}

InvoicesListWithForm.propTypes = {
  // بدون نیاز به پراپ‌های ورودی در این مورد
};

export default InvoicesListWithForm;
