const API_URL = "https://amin-beton-back.chbk.app/api";

export async function addFactorAndPrice(obj) {
  const token = JSON.parse(localStorage.getItem("token"));

  // Create a FormData object and append the data
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }

  try {
    const res = await fetch(`${API_URL}/order-management/add-factor/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      const errorMessage =
        errorResponse.order?.join(", ") || "Unknown error occurred";

      throw new Error(errorMessage || "درخواست با خطا مواجه شد!");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    // throw Error("فرایند افزودن فاکتور و هزینه با خطا مواجه شد!");
    throw Error(err.message);
  }
}
