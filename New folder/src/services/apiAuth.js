const API_URL = "https://amin-beton-back.chbk.run/api";

export async function signup(cred) {
  try {
    const res = await fetch(`${API_URL}/users/register/`, {
      method: "POST",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
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
      mode: "no-cors",
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error("فرایند ورود با خطا مواجه شد...");
  }
}

// export async function getCurrentUser() {
//   // check if the user is in cache, meaning that is already logged in
//   const { data: session } = await supabase.auth.getSession();
//   // if there's no user :
//   if (!session.session) return null;

//   //  but if there's a user, get the user again from DB for safety
//   const { data, error } = await supabase.auth.getUser();
//   console.log(data);
//   if (error) throw new Error(error.message);

//   return data?.user;
// }
