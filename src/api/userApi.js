// API Proxies. These functions call our API
// Centralizing here for consistency, reuse, and to provide for mocking
export function getUsers() {
  return fetch("http://localhost:3001/users").then(handleResponse);
}

export function deleteUser(userId) {
  return fetch("http://localhost:3001/users/" + userId, {
    method: "DELETE"
  });
}

// Centralized response handler
function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not okay");
}
