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

// Post must be in FormData
export function createPost(formData) {
  return fetch('/post', {
    method: 'POST',
    body: formData,
  }).then((response) => response.json())
}

export function updatePost(formData) {
  return fetch('/post', {
    method: 'PATCH',
    body: formData,
  }).then((response) => response.json())
}
