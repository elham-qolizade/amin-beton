const API_URL = "https://amin-beton-back.chbk.app/api";

// CUSTOMERS TAB
export async function getWaitingCustomers() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/user-management?verified=False`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
    // This will then go into the catch block, where the message is set
    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("دریافت اطلاعات با خطا مواجه شد...");
  }
}

// ###########################################################################

export async function approveWaitingCustomer(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/user-management/verify-user/`, {
      method: "POST",
      body: JSON.stringify({ user_id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
    // This will then go into the catch block, where the message is set
    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند تایید مشتری با خطا مواجه شد!");
  }
}

// ###########################################################################

export async function deleteCustomer(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/user-management/delete-user/`, {
      method: "POST",
      body: JSON.stringify({ user_id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error("فرایند حذف مشتری با خطا مواجه شد!");

    // Assuming you might want to return some data upon success
    // const data = await res.json();
    // return data;
  } catch (err) {
    console.error("Error deleting Customer:", err.message);
    throw Error(err);
  }
}

// ###########################################################################

export async function updateCustomer(updatedObject, id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/user-management/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(updatedObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("فرایند ویرایش با خطا مواجه شد!");
  }
}

// ###########################################################################

export async function getConfirmedCustomers() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/user-management?verified=True`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
    // This will then go into the catch block, where the message is set
    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("دریافت اطلاعات با خطا مواجه شد...");
  }
}

// ###########################################################################

// ORDERS TAB

export async function getWaitingOrders() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/order-management/?verified=False`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت سفارش ها با خطا مواجه شد.");
  }
}

// ###########################################################################

export async function approveWaitingOrder(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/order-management/verify-order/`, {
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
    throw Error("فرایند تایید سفارش با خطا مواجه شد!");
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
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت سفارش ها با خطا مواجه شد.");
  }
}

// ###########################################################################

// Note
export async function addNote(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/order-management/add-note/`, {
      method: "POST",
      body: JSON.stringify(obj),
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
    throw Error("فرایند افزودن یادداشت با خطا مواجه شد!");
  }
}
// ###########################################################################
export async function updateOrderApi(id, updatedData) {
  const token = JSON.parse(localStorage.getItem("token"));

  console.log("updateOrderApi - id:", id); // لاگ گرفتن از id
  console.log("updateOrderApi - updatedData:", updatedData); // لاگ گرفتن از updatedData
  console.log("updateOrderApi - token (before parsing):", localStorage.getItem("token")); // لاگ گرفتن از توکن قبل از پارس کردن
  console.log("updateOrderApi - token (after parsing):", token); // لاگ گرفتن از توکن بعد از پارس کردن

  if (token && token.access) {
    console.log("updateOrderApi - token.access:", token.access); // لاگ گرفتن از token.access
  } else {
    console.error("updateOrderApi - توکن یا token.access تعریف نشده است.");
  }

  try {
    const response = await fetch(`${API_URL}/order-management/${id}/`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log("updateOrderApi - response status:", response.status); // لاگ گرفتن از وضعیت پاسخ
    console.log("updateOrderApi - response headers:", response.headers); // لاگ گرفتن از هدرهای پاسخ

    if (!response.ok) {
      const errorText = await response.text(); // دریافت متن خطا از پاسخ
      console.error("updateOrderApi - پاسخ خطا:", errorText); // لاگ گرفتن از متن خطا
      throw new Error("ویرایش سفارش با مشکل مواجه شد.");
    }

    const responseData = await response.json();
    console.log("updateOrderApi - پاسخ موفق:", responseData); // لاگ گرفتن از پاسخ موفق

    return responseData;
  } catch (error) {
    console.error("updateOrderApi - خطا در ویرایش سفارش:", error);
    throw new Error("فرایند ویرایش سفارش با خطا مواجه شد!");
  }
}
// ###########################################################################