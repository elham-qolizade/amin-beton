import PropTypes from "prop-types";
import styled from "styled-components"; // اضافه کردن styled-components

const Wrapper = styled.div`
  padding: 10rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-dark);
  margin-bottom: 1rem;
`;

const StatusText = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-800);
`;

const PriceText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-green-600);
`;

const CreatedAtText = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-600);
`;

const InvoiceLink = styled.a`
  color: var(--color-blue-600);
  font-size: 1.1rem;
  text-decoration: none;

  &:hover {
    color: var(--color-blue-800);
  }
`;

const DenyReason = styled.p`
  font-size: 1.1rem;
  color: var(--color-red-600);
  font-weight: bold;
`;

const ConfirmButton = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: var(--color-brand-600);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-800);
  }

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

function FactorAndPriceWindow({ orderDetails, onConfirm, disabled }) {
  if (!orderDetails || Object.keys(orderDetails).length === 0) {
    return <p>هیچ اطلاعاتی برای این سفارش موجود نیست.</p>;
  }

  // 🟢 لیست وضعیت‌ها بر اساس مقدار عددی
  const statusMap = {
    1: "ارسال شده",
    2: "تایید شده",
    3: "رد شده",
  };

  return (
    <Wrapper>
      <Title>پیش فاکتور</Title>

      {/* ✅ نمایش وضعیت سفارش */}
      <StatusText>
        وضعیت: {statusMap[orderDetails.status] ?? "نامشخص"}
      </StatusText>

      {/* ✅ نمایش قیمت */}
      <PriceText>
        قیمت: {orderDetails.price ? `${orderDetails.price} تومان` : "بدون قیمت"}
      </PriceText>

      {/* ✅ نمایش تاریخ ایجاد */}
      <CreatedAtText>تاریخ ایجاد: {orderDetails.created_at}</CreatedAtText>

      {/* ✅ نمایش لینک فاکتور در صورت وجود */}
      {orderDetails.invoice_file ? (
        <p>
          فایل فاکتور:{" "}
          <InvoiceLink
            href={orderDetails.invoice_file}
            target="_blank"
            rel="noopener noreferrer"
          >
            دانلود فاکتور
          </InvoiceLink>
        </p>
      ) : (
        <p>فاکتور موجود نیست.</p>
      )}

      {/* ✅ نمایش دلیل رد شدن فقط اگر وضعیت "رد شده" باشد */}
      {orderDetails.status === 3 && orderDetails.deny_reason && (
        <DenyReason>دلیل رد شدن: {orderDetails.deny_reason}</DenyReason>
      )}

      {/* دکمه‌ی تأیید */}
      <ConfirmButton
        onClick={() => onConfirm(orderDetails.id)}
        disabled={disabled}
      >
        تأیید
      </ConfirmButton>
    </Wrapper>
  );
}

FactorAndPriceWindow.propTypes = {
  orderDetails: PropTypes.shape({
    status: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    invoice_file: PropTypes.string,
    deny_reason: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FactorAndPriceWindow;
