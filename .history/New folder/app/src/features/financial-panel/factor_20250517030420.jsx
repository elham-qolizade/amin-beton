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
      <>
        <p>هیچ پیش‌فاکتوری ثبت نشده است.</p>

        <FormWrapper
          onSubmit={handleCreateInvoice}
          encType="multipart/form-data"
        >
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
            onChange={(e) => setFile(e.target.files[0])}
          />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "در حال ارسال..." : "ایجاد پیش‌فاکتور"}
          </SubmitButton>
        </FormWrapper>
      </>
    )}
  </Wrapper>
);

// InvoicesListWithForm.propTypes = {
//   orderDetails: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default InvoicesListWithForm;
