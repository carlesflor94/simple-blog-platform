const BASE_URL = "https://api.realworld.io/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
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
