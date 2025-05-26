const API_URL = "https://amin-beton-back.chbk.run/api";

export async function postContact(req) {
  try {
    const res = await fetch(`${API_URL}/users/contact-us/`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("ارسال اطلاعات با خطا مواجه شد...");
  }
}
