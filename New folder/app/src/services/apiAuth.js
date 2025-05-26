const API_URL = "https://amin-beton-back.chbk.app/api";

export async function signup(cred) {
  try {
    const res = await fetch(`${API_URL}/users/register/`, {
      method: "POST",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("فرایند ثبت نام با خطا مواجه شد...");
  }
}

export async function login(cred) {
  try {
    const res = await fetch(`${API_URL}/token/`, {
      method: "POST",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("فرایند ورود با خطا مواجه شد...");
  }
}

export function logout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
  // Perform a hard reload to navigate to the home page
  window.location.href = "/";
}

export async function getCurrentUser() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token?.access) return null;

  try {
    const res = await fetch(`${API_URL}/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();

    // ذخیره roles در localStorage
    if (data.roles) {
      localStorage.setItem("roles", JSON.stringify(data.roles));
    }

    return data;
  } catch (err) {
    console.log("get current user error : ", err);
    throw Error("دریافت اطلاعات کاربر با خطا مواجه شد...");
  }
}
