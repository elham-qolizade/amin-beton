const API_URL = "https://amin-beton-back.chbk.app/api";
// const API_URL = "http://127.0.0.1:8000";

export async function getConfirmedOrders() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/order-management/?verified=True`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    if (!res.ok) throw Error();

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت سفارش ها با خطا مواجه شد.");
  }
}

// ###########################################################################

export async function deleteOrder(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/order-management/delete-order/`, {
      method: "POST",
      body: JSON.stringify({ order_id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند حذف سفارش با خطا مواجه شد!");
  }
}

// ###########################################################################
// Note
export async function getNote(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/get-order-notes/`, {
      method: "POST",
      body: JSON.stringify({ order_id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت یادداشت با خطا مواجه شد!");
  }
}
