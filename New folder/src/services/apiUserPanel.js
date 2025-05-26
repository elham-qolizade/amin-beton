const API_URL = "http://localhost:8000";

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the projects");

  const data = await res.json();
  return data;
}

export async function getProject({ id }) {
  const res = await fetch(`${API_URL}/projects/${id}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the project");

  const data = await res.json();
  return data;
}

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  // This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting the orders");

  const data = await res.json();
  return data;
}
