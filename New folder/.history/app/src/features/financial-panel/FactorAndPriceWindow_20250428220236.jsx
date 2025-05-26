import React from "react";

function FinalInvoiceSection({ orderDetails }) {
  const [loading, setLoading] = useState(true);
  const [factor, setFactor] = useState(null);
  const [price, setPrice] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [fileUploading, setFileUploading] = useState(false); // جدید
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
