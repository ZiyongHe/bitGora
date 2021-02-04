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
