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
  const [price, setPrice] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [showForm, setShowForm] = useState(false); // برای نمایش فرم

  const orderId = orderDetails.id; // استفاده از orderDetails برای دریافت id

  useEffect(() => {
    console.log("Order ID: ", orderId); // بررسی مقدار orderId
    const fetchFactor = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("توکن پیدا نشد!");
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
            body: JSON.stringify({ order_id: orderId }), // از orderId استفاده کنید
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setFactor(data);
        } else if (response.status === 404) {
          setShowForm(true);
        }
      } catch (error) {
        console.error("خطا در دریافت فاکتور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactor();
  }, [orderId]);
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
      formData.append("price", price);
      if (invoiceFile) {
        formData.append("invoice_file", invoiceFile);
      }

      const token = localStorage.getItem("token"); // اینجا توکن رو میگیریم

      const response = await fetch(
        "http://amin-beton-back.chbk.app/api/invoice-management/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // اضافه کردن هدر توکن
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
        alert("مشکلی پیش آمد، دوباره تلاش کنید!");
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
            <label>لینک فایل فاکتور:</label>
            <InputField
              type="file"
              onChange={(e) => setFileLink(e.target.files[0])}
            />

            <SubmitButton type="submit">ایجاد فاکتور</SubmitButton>
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
