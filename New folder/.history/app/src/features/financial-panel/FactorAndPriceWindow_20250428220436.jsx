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

function FinalInvoiceSection({ orderDetails }) {
  // const [loading, setLoading] = useState(true);
  const [factor, setFactor] = useState(null);
  const [price, setPrice] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileUploading, setFileUploading] = useState(false); // جدید
  // const [showForm, setShowForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const orderId = orderDetails.id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setFileUploading(true);
      const response = await fetch(
        "https://amin-beton-back.chbk.app/api/orders/upload-invoice-file/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setFileLink(data.file_url); // فرض: API لینک فایل آپلود شده رو توی `file_url` برمی‌گردونه
      } else {
        console.error("خطا در آپلود فایل");
      }
    } catch (error) {
      console.error("خطا در ارسال فایل:", error);
    } finally {
      setFileUploading(false);
    }
  };

  const handleCreateFactor = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!price || !fileLink) {
      alert("لطفاً قیمت و فایل فاکتور را وارد کنید.");
      return;
    }

    try {
      const response = await fetch(
        "https://amin-beton-back.chbk.app/api/orders/create-order-factor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ price, fileLink, order_id: orderId }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setFactor(data);
        setShowForm(false);
      } else {
        console.error("خطا در ایجاد فاکتور");
      }
    } catch (error) {
      console.error("خطا در ارسال فاکتور:", error);
    }
  };

  return (
    <Wrapper>
      <Title>فاکتور نهایی سفارش</Title>

      {loading && <p>در حال دریافت اطلاعات...</p>}

      {!loading && factor ? (
        <InvoiceBox>
          <p>💰 قیمت: {factor.price} تومان</p>
          <p>
            📎 فایل فاکتور:{" "}
            <a href={factor.factor} target="_blank" rel="noopener noreferrer">
              دانلود
            </a>
          </p>
        </InvoiceBox>
      ) : (
        !loading &&
        showForm && (
          <FormWrapper onSubmit={handleCreateFactor}>
            <label>قیمت فاکتور:</label>
            <InputField
              type="number"
              value={price}
              placeholder="مثلاً 2000000"
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>آپلود فایل فاکتور:</label>
            <InputField
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png" // فرمت‌های مجاز
            />

            {fileUploading && <p>در حال آپلود فایل...</p>}
            {fileLink && <p className="text-green-500">✅ فایل آپلود شد!</p>}

            <SubmitButton type="submit" disabled={fileUploading}>
              ایجاد فاکتور
            </SubmitButton>
          </FormWrapper>
        )
      )}
    </Wrapper>
  );
}

FinalInvoiceSection.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number.isRequired, // id باید یک عدد باشد
    invoices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired, // id فاکتور باید یک عدد باشد
        status: PropTypes.number.isRequired, // وضعیت باید یک عدد باشد
        invoice_file: PropTypes.string, // فایل فاکتور (اختیاری)
        deny_reason: PropTypes.string, // دلیل رد (اختیاری)
        created_at: PropTypes.string, // تاریخ ایجاد باید یک رشته باشد
        price: PropTypes.number.isRequired, // قیمت باید یک عدد باشد
      })
    ).isRequired, // آرایه‌ای از فاکتورها که باید موجود باشد
  }).isRequired, // `orderDetails` باید موجود باشد
};

export default FinalInvoiceSection;
