export function newChatRoom(postId, username) {
  return fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId: postId, username: username }),
  }).then((res) => res.json())
}

export function getChatRoom(username) {
  return fetch(`/chat/list/${username}`).then((res) => res.json())
}

export function getMessage(roomId) {
  return fetch(`/chat/messages/${roomId}`).then((res) => res.json())
}

export function addChatNotification(roomId, index) {
  return fetch(`/chat/addnotification/${roomId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ index }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export function zeroChatNotification(roomId, username) {
  return fetch(`/chat/zeronotifictaion/${roomId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
