const API_URL ="https://django-ab-bridge.chbk.app";

export async function getTransports() {
  const res = await fetch(`${API_URL}/transports`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the Transports");

  const data = await res.json();
  return data;
}

// // ############################################################

// export async function getTransport({ id }) {
//   const res = await fetch(`${API_URL}/transports/${id}`);

//   if (!res.ok) throw Error("Failed getting the Transport");
//   const data = await res.json();
//   return data;
// }

// // ############################################################

// export async function updateTransport({ id, updateObj }) {
//   try {
//     const res = await fetch(`${API_URL}/transports/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updateObj),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     // We don't need the data, so we don't return anything
//   } catch (err) {
//     throw Error("عملیات با موفقیت انجام نشد.");
//   }
// }

// ############################################################

// export async function getOrder(id) {
//   try {
//     const res = await fetch(`${API_URL}/order/${id}`);

//     if (!res.ok) throw Error(`Couldn't find order #${id}`);

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// export async function createOrder(newOrder) {
//   try {
//     const res = await fetch(`${API_URL}/order`, {
//       method: "POST",
//       body: JSON.stringify(newOrder),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     const data = await res.json();
//     return data;
//   } catch {
//     throw Error("Failed creating your order");
//   }
// }

// export async function updateOrder(id, updateObj) {
//   try {
//     const res = await fetch(`${API_URL}/order/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updateObj),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     // We don't need the data, so we don't return anything
//   } catch (err) {
//     throw Error("Failed updating your order");
//   }
// }
