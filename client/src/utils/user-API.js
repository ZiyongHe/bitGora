export function getSession() {
  return fetch('/user/current-session').then((response) => response.json())
}

export function login(username, password) {
  return fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json())
}

export function logout() {
  return fetch('/user/logout').then((response) => response.json())
}

export function signup(email, username, password) {
  return fetch('/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  }).then((response) => response.json())
}

export function zeroDatabaseNotification(username, newUserNotification) {
  return fetch(`/user/notification`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, newUserNotification }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error)
    })
}
