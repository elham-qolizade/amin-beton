const API_URL = "https://amin-beton-back.chbk.run/api";
// const API_URL = "http://127.0.0.1:8000";

// CUSTOMERS TAB
export async function getWaitingCustomers() {
  try {
    const res = await fetch(`${API_URL}/user-management?verified=False`);
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
    // This will then go into the catch block, where the message is set
    if (!res.ok) throw Error("xxx");

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("دریافت اطلاعات با خطا مواجه شد...");
  }
}

// ###########################################################################

export async function getConfirmedCustomers() {
  try {
    const res = await fetch(`${API_URL}/user-management?verified=True`);
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
    // This will then go into the catch block, where the message is set
    if (!res.ok) throw Error("xxx");

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
  const res = await fetch(`${API_URL}/waiting-orders`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the Waiting Orders");

  const data = await res.json();
  return data;
}

// ###########################################################################

export async function getConfirmedOrders() {
  const res = await fetch(`${API_URL}/confirmed-orders`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the Confirmed orders");

  const data = await res.json();
  return data;
}

// ###########################################################################
