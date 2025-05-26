const API_URL = "https://amin-beton-back.chbk.app/api";
const NESHAN_URL = "https://api.neshan.org/v5";

// Projects
export async function getProjects() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/projects/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get projects err : ", err);
    throw Error("دریافت اطلاعات پروژه ها با خطا مواجه شد...");
  }
}

export async function createProject(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/projects/`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند ایجاد پروژه با خطا مواجه شد!");
  }
}

export async function getProject({ id }) {
  const res = await fetch(`${API_URL}/projects/${id}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the project");

  const data = await res.json();
  return data;
}

// ################################################################################s
// Orders

export async function getAllOrders() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get orders err : ", err);
    throw Error("دریافت اطلاعات سفارش ها با خطا مواجه شد.");
  }
}

export async function getOrder(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get order with id err : ", err);
    throw Error("دریافت اطلاعات سفارش با خطا مواجه شد.");
  }
}

export async function getProjectOrders(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/project-orders/`, {
      method: "POST",
      body: JSON.stringify({ project_id: id }),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("دریافت سفارش های پروژه با خطا مواجه شد.");
  }
}

// ################################################################################s
// Make Initial Order Form

// DropDowns data
// 1. Concrete list
export async function getConcreteList() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales/concrete-list/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get concrete list error : ", err);
    throw Error("دریافت لیست بتن ها با خطا مواجه شد...");
  }
}

// 2.Concrete pouring type list
export async function getConcretePouringTypeList() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales/concrete-pouring-type-list/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get concrete pouring type list error : ", err);
    throw Error("دریافت لیست مقاطع بتن ریزی با خطا مواجه شد...");
  }
}

// 3.Concrete resistance class list
export async function getConcreteResistanceClassList() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(
      `${API_URL}/sales/concrete-resistance-class-list/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get concrete resistance class list error : ", err);
    throw Error("دریافت لیست رده های مقاومت بتن با خطا مواجه شد...");
  }
}

// 4.Pump list or All SubPump list
export async function getPumpList(type = "parent") {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales-pump/?type=${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get Pump list error : ", err);
    throw Error("دریافت لیست پمپ ها با خطا مواجه شد...");
  }
}

// 5.SubPump list
export async function getSubPumpList(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales-pump/${id}/sub-pumps/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get SubPump list error : ", err);
    throw Error("دریافت لیست پمپ های زیرمجموعه با خطا مواجه شد...");
  }
}

// 6.Vibrator list
export async function getVibratorList(type = "parent") {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales-vibrator/?type=${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get Vibrator list error : ", err);
    throw Error("دریافت لیست ویبراتور ها با خطا مواجه شد...");
  }
}

// 7.SubVibrator list
export async function getSubVibratorList(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/sales-vibrator/${id}/sub-vibrators/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("get SubVibrator list error : ", err);
    throw Error("دریافت لیست ویبراتور های زیرمجموعه با خطا مواجه شد...");
  }
}

// ##################### MAKE ORDER #####################

// Submit the Initial Order Form
export async function createInitialOrder(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند ایجاد سفارش اولیه با خطا مواجه شد!");
  }
}

// Submit the Pump order form
export async function createPumpOrder(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/add-pump-order/`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند ایجاد سفارش پمپ ها با خطا مواجه شد!");
  }
}

// Submit the Vibrator order form
export async function createVibratorOrder(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/add-vibrator-order/`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند ایجاد سفارش ویبراتور ها با خطا مواجه شد!");
  }
}

// Submit the Complete Order Form
export async function createCompleteOrder({ id, obj }) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/orders/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند نهایی سازی سفارش با خطا مواجه شد!");
  }
}

// ################################################################################
// Lab (order details)

export async function getOrderLabResults(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/lab-result/get-order-lab-results/`, {
      method: "POST",
      body: JSON.stringify({ order_id: id }),
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت آزمایش‌های سفارش با خطا مواجه شد!");
  }
}

// ################################################################################
// Invoice

export async function changeInvoiceStatus({ id, obj }) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(
      `${API_URL}/invoices/${id}/change-invoice-status/`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند تغییر وضعیت پیش فاکتور با خطا مواجه شد!");
  }
}

// ################################################################################

export async function getReverseGeocoding({ latitude, longitude }) {
  try {
    const res = await fetch(
      `${NESHAN_URL}/reverse?lat=${latitude}&lng=${longitude}`,
      {
        method: "GET",
        headers: {
          "Api-Key": "service.1511f06833954b98a0044bd875d89943",
        },
      }
    );

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("NESHAN err : ", err);
  }
}
