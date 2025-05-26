const API_URL = "https://amin-beton-back.chbk.app/api";

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

// NEWS
export async function getNews() {
  try {
    const res = await fetch(`${API_URL}/news/`);

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw Error("دریافت اخبار با خطا مواجه شد...");
  }
}
