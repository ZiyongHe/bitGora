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

export function addUserNotification(username, newUserNotification) {
  return fetch(`/user/addnotification`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, newUserNotification }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
