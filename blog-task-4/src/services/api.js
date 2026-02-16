const BASE_URL = "https://realworld.habsida.net/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export default {
  get: (url) => request(url),
  post: (url, body) =>
    request(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (url, body) =>
    request(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (url) =>
    request(url, {
      method: "DELETE",
    }),
};
