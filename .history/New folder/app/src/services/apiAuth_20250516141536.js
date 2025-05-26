const API_URL = "https://amin-beton-back.chbk.app/api";

export async function login(cred) {
  try {
    const res = await fetch(`${API_URL}/token/`, {
      method: "POST",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("اطلاعات ورود نادرست است.");

    const data = await res.json();

    // ذخیره توکن و نقش‌ها در localStorage
    localStorage.setItem("token", JSON.stringify(data));
    localStorage.setItem("roles", JSON.stringify(data.roles || []));

    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw Error("فرایند ورود با خطا مواجه شد...");
  }
}
