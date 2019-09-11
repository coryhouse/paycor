// API Proxies. These functions call our API
// Centralizing here for consistency, reuse, and to provide for mocking
export function getUsers() {
  return fetch("http://localhost:3001/users").then(handleResponse);
}

export function getUserById(userId) {
  return (
    fetch("http://localhost:3001/users?id=" + userId)
      .then(handleResponse)
      // API returns an array for query, so take first match.
      .then(users => users[0])
  );
}

export function deleteUser(userId) {
  return fetch("http://localhost:3001/users/" + userId, {
    method: "DELETE"
  });
}

export function addUser(user) {
  return fetch("http://localhost:3001/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json"
    }
  });
}

export function editUser(user) {
  return fetch("http://localhost:3001/users/" + user.id, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json"
    }
  });
}

// Centralized response handler
function handleResponse(response) {
  if (response.ok) return response.json();
  throw new Error("Network response was not okay");
}
