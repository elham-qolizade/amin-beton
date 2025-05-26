const API_URL = "https://amin-beton-back.chbk.app/api";

export async function getOrderLabResults(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(
      `${API_URL}/lab-result-management/get-order-lab-results/`,
      {
        method: "POST",
        body: JSON.stringify({ order_id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      }
    );

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت نتایج آزمایشگاه با خطا مواجه شد!");
  }
}

// ###########################################################################

export async function createLabResult(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  // Create a FormData object and append the data
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }

  try {
    const res = await fetch(`${API_URL}/lab-result-management/`, {
      method: "POST",
      body: formData,
      // body: JSON.stringify(obj),
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند ایجاد نتیجه آزمایشگاه با خطا مواجه شد!");
  }
}

export async function getLabCategories() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/lab-result-category-management/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("فرایند دریافت کتگوری های آزمایشگاه با خطا مواجه شد!");
  }
}
