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

function FinalInvoiceSection({ orderDetails }) {
  const [loading, setLoading] = useState(true);
  const [factor, setFactor] = useState(null);
  const [showForm, setShowForm] = useState(false); // برای نمایش فرم

  useEffect(() => {
    const fetchFactor = async () => {
      const token = localStorage.getItem("accessToken"); // دریافت توکن از localStorage

      if (!token) {
        console.error("توکن پیدا نشد!");
        return;
      }

      if (!orderDetails?.id) {
        console.error("Order ID is missing");
        return;
      }

      try {
        const response = await fetch(
          "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order_id: orderDetails.id }), // استفاده از orderDetails.id
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setFactor(data);
        } else if (response.status === 404) {
          setShowForm(true); // اگر فاکتور پیدا نشد، فرم را نشان بده
        }
      } catch (error) {
        console.error("خطا در دریافت فاکتور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactor();
  }, [orderDetails]); // تغییرات در orderDetails باعث اجرای مجدد useEffect می‌شود

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
        !loading &&
        showForm && (
          <FormWrapper>
            <p>
              فاکتوری برای این سفارش یافت نشد. لطفاً قیمت و لینک فایل فاکتور را
              وارد کنید.
            </p>
            {/* در اینجا شما می‌توانید فرم ایجاد فاکتور را نمایش دهید */}
          </FormWrapper>
        )
      )}
    </Wrapper>
  );
}

FinalInvoiceSection.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // سایر فیلدهای موجود در orderDetails
  }).isRequired,
};

export default FinalInvoiceSection;
