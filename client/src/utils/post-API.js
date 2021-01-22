export function getUnownedPosts() {
  return fetch('/post/unowned').then((response) => response.json())
}

export function getOwnedPosts() {
  return fetch('/post/owned').then((response) => response.json())
}

export function viewPost(id) {
  return fetch(`/post/view/${id}`).then((response) => response.json())
}

export function deletePost(id) {
  return fetch(`/post/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json())
}
