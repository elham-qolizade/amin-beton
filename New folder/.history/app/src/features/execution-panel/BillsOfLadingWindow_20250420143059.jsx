// ... بقیه import‌ها مثل styled, Spinner, PropTypes

function BillsOfLadingWindow({ orderId }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [plate, setPlate] = useState("");

  const token = JSON.parse(localStorage.getItem("token"))?.access;

  const fetchBills = useCallback(async () => {
    if (!token) return alert("دسترسی غیرمجاز.");
    setLoading(true);
    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/${orderId}/get-bills-of-lading/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setBills(data);
    } catch (err) {
      console.error("❌", err);
      alert("خطا در دریافت بارنامه‌ها");
    } finally {
      setLoading(false);
    }
  }, [orderId, token]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const handleAddBill = async (e) => {
    e.preventDefault();
    if (!driverName || !plate) return alert("تمام فیلدها را پر کنید.");

    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/${orderId}/create-bill-of-lading/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ driver_name: driverName, plate }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setDriverName("");
      setPlate("");
      setShowForm(false);
      fetchBills();
    } catch (err) {
      console.error("❌", err);
      alert("خطا در افزودن بارنامه");
    }
  };

  const handleDelete = async (billId) => {
    if (!window.confirm("از حذف مطمئنی؟")) return;
    try {
      const res = await fetch(
        `http://amin-beton-back.chbk.app/api/orders/delete-bill-of-lading/${billId}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(await res.text());
      fetchBills();
    } catch (err) {
      console.error("❌", err);
      alert("خطا در حذف بارنامه");
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      <h2>📦 بارنامه‌های سفارش شماره {orderId}</h2>

      <Button onClick={() => setShowForm((s) => !s)}>
        {showForm ? "لغو افزودن" : "➕ افزودن بارنامه"}
      </Button>

      {showForm && (
        <Form onSubmit={handleAddBill}>
          <Input
            type="text"
            placeholder="نام راننده"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="پلاک"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
          <Button type="submit">ثبت بارنامه</Button>
        </Form>
      )}

      {bills.length === 0 ? (
        <p>هیچ بارنامه‌ای ثبت نشده است.</p>
      ) : (
        bills.map((bill) => (
          <BillCard key={bill.id}>
            <DeleteButton onClick={() => handleDelete(bill.id)}>
              🗑️
            </DeleteButton>

            <div className="flex flex-col items-start justify-between gap-6 bg-white md:flex-row md:items-center p-4 rounded-md">
              {/* اطلاعات بارنامه (راست) */}
              <div className="flex flex-col w-full gap-4 md:w-1/2">
                <p className="mt-1 text-sm text-yellow-600">
                  وضعیت: {bill.bill_of_lading_status}
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <p>
                    نام راننده:{" "}
                    <span className="font-medium text-gray-900">
                      {bill.driver_name}
                    </span>
                  </p>
                  <p>
                    موبایل راننده:{" "}
                    <span className="font-medium">{bill.driver_mobile}</span>
                  </p>
                  <p>
                    شماره بارنامه:{" "}
                    <span className="font-medium">
                      {bill.bill_of_lading_id}
                    </span>
                  </p>
                  <p>
                    پلاک:{" "}
                    <span className="font-medium">
                      {bill.plate_number_2} {bill.plate_number_alphabet}{" "}
                      {bill.plate_number_3} - {bill.plate_number_iran}
                    </span>
                  </p>
                  <p>
                    تاریخ ایجاد:{" "}
                    <span className="font-medium">{bill.create_at}</span>
                  </p>
                  <p>
                    IMEI دستگاه:{" "}
                    <span className="font-medium">{bill.IMEI}</span>
                  </p>
                </div>
              </div>

              {/* اطلاعات وزن (چپ) */}
              <div className="flex flex-col w-full gap-2 text-sm md:w-1/2">
                <p>
                  وزن خالی:{" "}
                  <span className="font-medium">
                    {bill.empty_weight} کیلوگرم
                  </span>
                </p>
                <p>
                  وزن پر:{" "}
                  <span className="font-medium">
                    {bill.total_weight} کیلوگرم
                  </span>
                </p>
                <p>
                  وزن خالص:{" "}
                  <span className="font-medium">{bill.net_weight} کیلوگرم</span>
                </p>
              </div>
            </div>
          </BillCard>
        ))
      )}
    </Container>
  );
}
